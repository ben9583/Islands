import React from "react"
import Script from "next/script"

export default function Head() {
  return (
    <>
      <title>Islands: An Open Platform</title>
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <meta
        name="description"
        content="An open social platform built for a better experience for all"
      />
      <link rel="icon" href="/favicon.ico" />
      <Script id="refresh-script">{"fetch(window.location.origin + '/api/refresh', { method: 'POST' })"}</Script>
    </>
  )
}
