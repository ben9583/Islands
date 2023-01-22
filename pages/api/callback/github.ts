import type { NextApiRequest, NextApiResponse } from "next"
import { getUser } from "../../../lib/provider/github"
import { getUserFromEmail } from "../../../lib/user"
import { setCookies } from "../../../lib/utils/cookies"

type GitHubAccessTokenResponse = {
  access_token: string;
  scope: string;
  token_type: string;
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
    }),
  })

  if (response.status !== 200) {
    res.status(303).redirect("/")
    return
  }

  const data = (await response.json()) as GitHubAccessTokenResponse

  setCookies(
    res,
    ["provider", "access_token"],
    ["github", data.access_token],
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
