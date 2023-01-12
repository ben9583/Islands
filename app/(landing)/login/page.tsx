import React from "react"
import Container from "../../../components/FormComponents/Container"
import Separator from "../../../components/FormComponents/Separator"
import Integration from "../../../components/Integration"
import styles from "./page.module.css"

export default function Login() {
  return (
    <main className={styles.main}>
      <Container height={300}>
        <div>
          <h1>Login</h1>
        </div>
        <div>
          <Separator />
        </div>
        <div style={{ margin: "10px 0" }}>
          <p>Choose one of the following integrations below to continue.</p>
        </div>
        <div className={styles.integrations}>
          <Integration provider="discord" width="60%" height={40} />
          <Integration provider="github" width="60%" height={40} />
        </div>
      </Container>
    </main>
  )
}
