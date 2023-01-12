import React from "react"

export default function Container({ children, height = 300 }) {
  return (
    <div style={{width: 400, padding: 25, height, border: "1px solid #a746a7", borderRadius: 10, display: "flex", flexDirection: "column", position: "relative"}}>
      {children}
    </div>
  )
}
