import { Hind } from '@next/font/google'
import Navbar from '../components/Navbar'

import './globals.css'

const hind = Hind({ weight: '400', subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body className={hind.className}>
        <div className="navbar-container" style={{position: "sticky", top: 0, padding: "1rem 1rem"}}>
          <Navbar />
        </div>
        <div className="main-container">
          {children}
        </div>
      </body>
    </html>
  )
}
