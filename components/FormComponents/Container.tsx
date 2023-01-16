import React from "react"

type ContainerProps = {
  children: React.ReactNode,
  height: number,
}

export default function Container(props: ContainerProps) {
  const { children, height } = props
  return (
    <div style={{width: 400, padding: 25, height, border: "1px solid #a746a7", borderRadius: 10, display: "flex", flexDirection: "column", position: "relative"}}>
      {children}
    </div>
  )
}
