import type { NextApiRequest, NextApiResponse } from "next"
import { refreshToken } from "../../lib/auth/token"
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

  const refreshTokenVal = userCookies["refresh_token"]
  if (refreshTokenVal === undefined) {
    res.status(400).send("")
    return
  }

  const newTokens = await refreshToken(userCookies["provider"] ?? "", refreshTokenVal)
  if(newTokens === undefined) {
    res.status(400).send("")
    return
  }

  setCookies(
    res,
    ["provider", "access_token", "refresh_token"],
    ["discord", newTokens.access_token, newTokens.refresh_token],
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
        maxAge: newTokens.expires_in,
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
