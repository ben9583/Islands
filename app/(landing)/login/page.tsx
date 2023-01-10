import Integration from '../../../components/Integration'
import styles from './page.module.css'

export default function Login() {
    return (
        <main className={styles.main}>
            <div className={styles.loginContainer}>
                <div><h1>Login</h1></div>
                <div><div className={styles.separator} /></div>
                <div style={{ margin: "10px 0" }}><p>Choose one of the following integrations below to continue.</p></div>
                <div className={styles.integrations}>
                    <Integration provider="discord" width="60%" height={40} />
                    <Integration provider="github" width="60%" height={40} />
                </div>
            </div>
        </main>
    )
}
