import type { NextApiRequest, NextApiResponse } from 'next'
import { setCookies } from '../../../utils/cookies'

type Data = {
  success: boolean,
  message?: string,
}

type GitHubAccessTokenResponse = {
  access_token: string,
  scope: string,
  token_type: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const code: string | string[] | undefined = req.query.code
  if(code === undefined) {
    res.status(400).json({ success: false, message: "Invalid authorization code" })
    return
  }

  const response = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      client_id: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      code: code,
      redirect_uri: "http://localhost:3000/api/callback/github",
    })
  })

  if(response.status !== 200) {
    res.status(400).json({ success: false, message: "Invalid authorization code"})
    return
  }

  const data = await response.json() as GitHubAccessTokenResponse

  setCookies(res, ["provider", "access_token"], ["github", data.access_token], [
    { path: "/", maxAge: 31536000, httpOnly: true, secure: true, sameSite: "strict" },
    { path: "/", maxAge: 31536000, httpOnly: true, secure: true, sameSite: "strict" }
  ])

  res.status(303).redirect("/")
}
