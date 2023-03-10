import React from "react"
import { Hind } from "@next/font/google"

import "./globals.css"

const hind = Hind({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body className={hind.className}>{children}</body>
    </html>
  )
}
