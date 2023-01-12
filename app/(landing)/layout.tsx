import React from "react"
import Navbar from "../../components/Navbar"
import Footer from "../../components/Footer"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div
        className="navbar-container"
        style={{
          position: "sticky",
          top: 0,
          padding: "1rem 1rem",
          zIndex: 100,
          backgroundColor: "rgba(8, 16, 24, 0.33)",
          marginBottom: 32,
        }}
      >
        <Navbar />
      </div>
      <div className="main-container">{children}</div>
      <div className="footer-container">
        <Footer />
      </div>
    </>
  )
}
