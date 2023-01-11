import React from "react"
import Image from "next/image"
import styles from "./Navbar.module.css"
import CombinedPNG from "../assets/images/combined.png"
import Link from "next/link"

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarLogo}>
        <Link href="/">
          <Image src={CombinedPNG} alt="Logo" height={50} />
        </Link>
      </div>
      <div className={styles.whitespace} />
      <div className={styles.navbarLink}>
        <Link href="/about">
          <p>About</p>
        </Link>
      </div>
      <div className={styles.navbarLink}>
        <Link href="https://github.com/ben9583/islands">
          <p>Source</p>
        </Link>
      </div>
      <div
        className={[
          styles.navbarTransparentLink,
          styles.invisibleOnMobile,
        ].join(" ")}
      >
        <Link href="/login">
          <p>Open</p>
        </Link>
      </div>
    </nav>
  )
}
