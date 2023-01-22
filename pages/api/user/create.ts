import type { NextApiRequest, NextApiResponse } from "next"
import db from "../../../lib/db/postgresql"
import { getUser as getDiscordUser } from "../../../lib/provider/discord"
import { getUser as getGithubUser } from "../../../lib/provider/github"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if(req.method !== "POST") return res.status(405).end()

  if(req.cookies["provider"] === undefined || req.cookies["access_token"] === undefined) return res.status(401).end()

  let email = ""
  let image_url = ""
  switch(req.cookies["provider"]) {
  case "discord":
    const discordUser = await getDiscordUser(req.cookies["access_token"])
    if(discordUser === undefined) return res.status(401).end()

    if(discordUser.email === undefined || discordUser.verified === undefined || !discordUser.verified) return res.status(400).json({ error: "Invalid email" })
    email = discordUser.email

    if(discordUser.avatar) {
      image_url = `https://cdn.discordapp.com/avatars/${discordUser.id}/${discordUser.avatar}.png`
    } else {
      image_url = `https://cdn.discordapp.com/embed/avatars/${discordUser.discriminator}.png`
    }
    
    break
  case "github":
    const githubUser = await getGithubUser(req.cookies["access_token"])
    if(githubUser === undefined) return res.status(401).end()

    if(githubUser.email === undefined || githubUser.email === null) return res.status(400).json({ error: "Invalid email" })

    email = githubUser.email
    image_url = githubUser.avatar_url

    break
  }

  if(email === "" || image_url === "") return res.status(401).end()

  const { username, display_name, first_name, last_name } = req.body

  if(username.length < 3 || username.length > 16 || !username.match(/^[a-zA-Z0-9]*$/)) return res.status(400).json({ error: "Invalid username" })
  if(display_name.length < 1 || display_name.length > 32) return res.status(400).json({ error: "Invalid display name" })
  if(first_name.length < 1 || first_name.length > 32) return res.status(400).json({ error: "Invalid first name" })
  if(last_name.length < 1 || last_name.length > 32) return res.status(400).json({ error: "Invalid last name" })

  try {
    await db.query(
      "INSERT INTO users (email, username, display_name, first_name, last_name, image_url, time_joined, privilege) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)",
      [email, username, display_name, first_name, last_name, image_url, Math.floor((new Date()).getTime() / 1000), 1]
    )
  } catch(e: any) {
    if(e.detail.includes("email") && e.detail.includes("already exists")) return res.status(400).json({ error: "An account is already registered with this email" })
    if(e.detail.includes("username") && e.detail.includes("already exists")) return res.status(400).json({ error: "Username is not available" })

    return res.status(500).end()
  }

  res.status(201).end()
}
