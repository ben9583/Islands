"use client"

import React, { useState, useEffect } from "react"
import styles from "./InputFields.module.css"

export default function InputFields() {
  let [ username, setUsername ] = useState("")
  let [ message, setMessage ] = useState("")
  let [ usernameValid, setUsernameValid ] = useState(false)

  useEffect(() => {
    setUsernameValid(false)

    if(username.length > 0 && username.length < 3) {
      setMessage("Username must be at least 3 characters long.")
      return
    } else if(username.length === 0) {
      setMessage("")
      return
    }

    if(!username.match(/^[a-zA-Z0-9]*$/)) {
      setMessage("Username must only contain alphanumeric characters.")
      return
    }

    fetch(window.location.origin + "/api/user/" + username, {
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if(res.status !== 404) {
        setMessage("Username is not available.")
      } else {
        setMessage("")
      }
    })

    setUsernameValid(true)
  }, [username])

  return (
    <>
      <div>
        <input type="text" className={styles.input} placeholder="First Name" style={{width: "47.5%", marginRight: "2.5%"}} />
        <input type="text" className={styles.input} placeholder="Last Name" style={{width: "47.5%", marginLeft: "2.5%"}} />
      </div>
      <div>
        <input type="text" className={styles.input} placeholder="Username" style={{width: "100%"}} onChange={(input) => setUsername(input.currentTarget.value)} />
      </div>
      <div>
        <input type="text" className={styles.input} placeholder="Display Name" style={{width: "100%"}} />
      </div>
      <div>
        <p style={{color: "#f00"}}>{message}</p>
      </div>
    </>
  )
}