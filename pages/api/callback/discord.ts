import type { NextApiRequest, NextApiResponse } from "next"
import { getUser } from "../../../lib/provider/discord"
import { getUserFromEmail } from "../../../lib/user"
import { setCookies } from "../../../lib/utils/cookies"

type DiscordAccessTokenResponse = {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const code: string | string[] | undefined = req.query.code
  if (code === undefined) {
    res.status(303).redirect("/")
    return
  }

  const response = await fetch("https://discord.com/api/oauth2/token", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: `client_id=${process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID}&client_secret=${process.env.DISCORD_CLIENT_SECRET}&grant_type=authorization_code&code=${code}&redirect_uri=http://localhost:3000/api/callback/discord`,
  })

  if (response.status !== 200) {
    res.status(303).redirect("/")
    return
  }

  const data = (await response.json()) as DiscordAccessTokenResponse

  setCookies(
    res,
    ["provider", "access_token", "refresh_token"],
    ["discord", data.access_token, data.refresh_token],
    [
      {
        path: "/",
        maxAge: 31536000,
        httpOnly: true,
        secure: true,
        sameSite: "strict",
      },
      {
        path: "/",
        maxAge: data.expires_in,
        httpOnly: true,
        secure: true,
        sameSite: "strict",
      },
      {
        path: "/",
        maxAge: 31536000,
        httpOnly: true,
        secure: true,
        sameSite: "strict",
      },
    ]
  )

  const user = await getUser(data.access_token)
  if (user === undefined || user.email === undefined) {
    res.status(303).redirect("/")
    return
  }

  const db_entry = await getUserFromEmail(user.email)

  if (db_entry === undefined) {
    res.status(303).redirect("/confirm-registration")
  } else {
    res.status(303).redirect("/app")
  }
}
