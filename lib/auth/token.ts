type RefreshTokenResponse = {
  access_token: string
  refresh_token: string
  expires_in: number
}

const refreshToken = async (provider: string, refreshToken: string): Promise<RefreshTokenResponse | undefined> => {
  switch(provider) {
  case "discord":
    const response = await fetch("https://discord.com/api/oauth2/token", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `client_id=${process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID}&client_secret=${process.env.DISCORD_CLIENT_SECRET}&grant_type=refresh_token&refresh_token=${refreshToken}`,
    })

    if (response.status !== 200) {
      return
    }

    const data = (await response.json()) as RefreshTokenResponse
    return { access_token: data.access_token, refresh_token: data.refresh_token, expires_in: data.expires_in }
  default:
    throw new Error("Unable to refresh token; this method is not implemented for the provider: " + provider)
  }
}

export { refreshToken }