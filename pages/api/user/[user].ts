import type { NextApiRequest, NextApiResponse } from "next"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { user } = req.query

  if(user !== "ben9583") {
    res.status(404).send("User not found")
    return
  }
  res.status(200).json({
    username: "ben9583",
    displayName: "ben9583",
    timeJoined: 1673558453,
    imageUrl: "",
  })
}