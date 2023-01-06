import styles from './page.module.css'
import OceanSVG from '../assets/images/ocean.svg'
import Image from 'next/image'

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.welcomeText}>
        <h1>Chat, Share and</h1>
        <h1>Build your community</h1>
        <h1>on an Open Platform</h1>
      </div>
      <div className={styles.firstLevel}>
        <Image src={OceanSVG} alt="ocean" style={{width: '100%', height: 'auto', position: 'absolute', top: -37.5}}/>
        <div style={{display: 'flex'}}>
          <div style={{flex: 1}} />
          <div >

          </div>
        </div>
      </div>
    </main>
  )
}
