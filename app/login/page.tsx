import Integration from '../../components/login/Integration'
import styles from './page.module.css'
import loginStyles from '../../components/login/Login.module.css'

export default function Login() {
    return (
        <main className={styles.main}>
            <div className={loginStyles.loginContainer}>
                <div><h1>Login</h1></div>
                <div><div className={loginStyles.separator} /></div>
                <div style={{ margin: "10px 0" }}><p>Choose one of the following integrations below to continue.</p></div>
                <div className={loginStyles.integrations}>
                    <Integration provider="discord" width="60%" height={40} />
                    <Integration provider="github" width="60%" height={40} />
                </div>
            </div>
        </main>
    )
}
