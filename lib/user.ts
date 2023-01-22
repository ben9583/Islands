import { ReadonlyRequestCookies } from "next/dist/server/app-render"
import { RequestCookies } from "next/dist/server/web/spec-extension/cookies"
import db from "./db/postgresql"
import { getUser as getDiscordUser } from "./provider/discord"
import { getUser as getGithubUser } from "./provider/github"

interface UserDBEntry {
  id: number
  email: string
  username: string
  display_name: string
  first_name: string
  last_name: string
  image_url: string
  time_joined: number
  privilege: number
}

export enum UserStatus {
  Registered,
  NotRegistered,
  DoesNotExist
}

interface User<Status extends UserStatus> {
  status: Status
  user: Status extends UserStatus.Registered ? UserDBEntry : undefined
}

export async function getUserFromEmail(email: string) {
  const { rows } = await db.query(
    "SELECT * FROM users WHERE email = $1",
    [email]
  )

  return rows.length > 0 ? rows[0] as UserDBEntry : undefined
}

export async function getUserFromUsername(username: string) {
  const { rows } = await db.query(
    "SELECT * FROM users WHERE username = $1",
    [username]
  )

  return rows.length > 0 ? rows[0] as UserDBEntry : undefined
}

export async function getServerSideUser(userCookies: RequestCookies | ReadonlyRequestCookies) {
  const provider = userCookies.get("provider")?.value
  if(provider !== undefined) {
    let email = ""
    switch(provider) {
    case "discord":
      const discordUser = await getDiscordUser(userCookies.get("access_token")?.value ?? "")

      if(discordUser !== undefined) {
        email = discordUser.email ?? ""
      }

      break
    case "github":
      const githubUser = await getGithubUser(userCookies.get("access_token")?.value ?? "")

      if(githubUser !== undefined) {
        email = githubUser.email ?? ""
      }

      break
    }

    if(email !== "") {
      const dbUser =  await getUserFromEmail(email)

      if(dbUser !== undefined) {
        return { status: UserStatus.Registered, user: dbUser } as User<UserStatus.Registered>
      } else {
        return { status: UserStatus.NotRegistered, user: undefined } as User<UserStatus.NotRegistered>
      }
    }
  }

  return { status: UserStatus.DoesNotExist, user: undefined } as User<UserStatus.DoesNotExist>
}
