import type { NextApiRequest, NextApiResponse } from "next"
import { getUserFromUsername } from "../../../../lib/user"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if(req.method !== "GET") return res.status(405).end()
  const { user } = req.query

  if(typeof user !== "string" || user.length === 0) {
    res.status(400).end()
    return
  }

  const dbUser = await getUserFromUsername(user)

  dbUser !== undefined ? res.status(200).json({
    id: dbUser.id,
    username: dbUser.username,
    display_name: dbUser.display_name,
    image_url: dbUser.image_url,
    time_joined: dbUser.time_joined,
  }) : res.status(404).end()
}