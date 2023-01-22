type DiscordUser = {
  id: string
  username: string
  discriminator: string
  avatar?: string
  bot?: boolean
  system?: boolean
  mfa_enabled?: boolean
  locale?: string
  verified?: boolean
  email?: string
  flags?: number
  premium_type?: number
  public_flags?: number
}

export const getUser = async (accessToken: string): Promise<DiscordUser | undefined> => {
  const response = await fetch("https://discord.com/api/v10/users/@me", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  if (response.status !== 200) {
    return
  }

  const data = (await response.json()) as DiscordUser
  return data
}
