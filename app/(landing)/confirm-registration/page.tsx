import React from "react"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { refreshToken } from "../../../lib/auth/token"
import styles from "./page.module.css"
import Container from "../../../components/FormComponents/Container"
import Separator from "../../../components/FormComponents/Separator"
import InputFields from "../../../components/FormComponents/InputFields"

export default async function Home() {
  const userCookies = cookies()

  const provider = userCookies.get("provider")?.value
  if(provider === undefined) {
    redirect("/login")
  }
  
  let accessToken = userCookies.get("access_token")?.value
  if(accessToken === undefined) {
    const new_tokens = await refreshToken(provider, userCookies.get("refresh_token")?.value ?? "")
    if(new_tokens === undefined) redirect("/login")

    accessToken = new_tokens.access_token
  }
  
  return (
    <main className={styles.main}>
      <Container height={450}>
        <div>
          <h1>Confirm Registration</h1>
        </div>
        <div>
          <Separator />
        </div>
        <div style={{ margin: "10px 0" }}>
          <p>You&apos;ve successfully linked your {provider} account to Islands! Complete the following registration to finalize your profile.</p>
        </div>
        <InputFields />
      </Container>
    </main>
  )
}
