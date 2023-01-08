import styles from './page.module.css'
import OceanSVG from '../assets/images/ocean.svg'
import Image from 'next/image'

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.welcomeText}>
        <p>Chat, Share and</p>
        <p>Build your community</p>
        <p>on an Open Platform</p>
      </div>
      <div className={styles.levels}>
        <div className={styles.firstLevel}>
          <Image src={OceanSVG} alt="ocean" style={{width: '100%', height: 'auto', position: 'absolute', top: -37.5, zIndex: -1}}/>
          <div className={styles.levelInternal}>
            <div className={[styles.half, styles.halfUnused].join(" ")} />
            <div className={styles.half}>
              <div className={styles.levelTitle}>
                <h1 style={{position: 'absolute', bottom: 20, width: '100%'}}>Control as You Like It</h1>
              </div>
              <div className={styles.levelDescription}>
                <p style={{position: 'absolute', top: 20, width: '100%'}}>Islands enable you to seamlessly create a place to communicate. From small group chats to communities with thousands of members, owners choose how much customization they want.</p>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.secondLevel}>
          <div className={styles.levelInternal}>
            <div className={styles.half}>
              <div className={styles.levelTitle}>
                <h1 style={{position: 'absolute', bottom: 20, width: '100%'}}>Free, as the Internet Should Be</h1>
              </div>
              <div className={styles.levelDescription}>
                <p style={{position: 'absolute', top: 20, width: '100%'}}>As an open-source project, anyone can self-host and contribute to Islands. This empowers everyone to shape Islands into the social platform for all.</p>
              </div>
            </div>
            <div className={[styles.half, styles.halfUnused].join(" ")} />
          </div>
        </div>
        <div className={styles.thirdLevel}>
          <div className={styles.levelInternal}>
            <div className={[styles.half, styles.halfUnused].join(" ")} />
            <div className={styles.half}>
              <div className={styles.levelTitle}>
                <h1 style={{position: 'absolute', bottom: 20, width: '100%'}}>Ready to join?</h1>
              </div>
              <div className={styles.levelDescription}>
                <p style={{position: 'absolute', top: 20, width: '100%'}}>Create a profile to join an Island or make your own — or check out our source code and start building something awesome.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
