import LoginGuard from "../../components/LoginGuard"
import styles from "./page.module.css"

export default function Login() {
  return (
    <LoginGuard>
      <main>
        <h1>hi</h1>
      </main>
    </LoginGuard>
  )
}
