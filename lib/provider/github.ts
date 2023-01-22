type GithubUser = {
  login: string
  id: number
  node_id: string
  avatar_url: string
  gravatar_id: string
  url: string
  html_url: string
  email?: string
}

export const getUser = async (accessToken: string): Promise<GithubUser | undefined> => {
  const response = await fetch("https://api.github.com/user", {
    method: "GET",
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${accessToken}`,
    },
  })

  if (response.status !== 200) {
    return
  }

  const data = (await response.json()) as GithubUser
  return data
}
