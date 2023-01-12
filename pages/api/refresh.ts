import type { NextApiRequest, NextApiResponse } from "next"
import { setCookies } from "../../lib/utils/cookies"

type DiscordRefreshTokenResponse = {
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
  if(req.method !== "POST") {
    res.status(405).send("")
    return
  }
  const userCookies = req.cookies
  if(userCookies["access_token"] !== undefined) {
    res.status(204).send("")
    return
  }

  const refreshToken = userCookies["refresh_token"]
  if (refreshToken === undefined) {
    res.status(400).send("")
    return
  }

  const response = await fetch("https://discord.com/api/oauth2/token", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: `client_id=${process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID}&client_secret=${process.env.DISCORD_CLIENT_SECRET}&grant_type=refresh_token&refresh_token=${refreshToken}`,
  })

  if (response.status !== 200) {
    console.log(refreshToken)
    console.log(response.status)
    console.log(await response.json())
    res.status(400).send("")
    return
  }

  const data = (await response.json()) as DiscordRefreshTokenResponse

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

  res.status(200).send("")
}
