import React from 'react';
import Image from 'next/image';
import styles from './Footer.module.css'
import CombinedPNG from '../assets/images/combined.png'
import Link from 'next/link';

export default function Footer() {
    return (
        <div className={styles.footer}>
            <div className={styles.footerHalf}>
                <Image src={CombinedPNG} alt="Logo" height={125} />
                <p>Islands is open-source software </p>
                <p>built for the benefit of everyone.</p>
                <Link href="/about">Learn more about our mission here.</Link>
            </div>
            <div className={styles.footerHalf}>
                <p>Created by <Link href="https://ben9583.com">Ben Plate</Link> and <Link href="#">others.</Link></p>
            </div>
        </div>
    )
}