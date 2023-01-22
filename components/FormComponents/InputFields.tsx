"use client"

import React, { useState, useEffect } from "react"
import styles from "./InputFields.module.css"

export default function InputFields() {
  let [ username, setUsername ] = useState("")
  let [ usernameMessage, setUsernameMessage ] = useState<string | undefined>(undefined)
  let [ firstName, setFirstName ] = useState("")
  let [ firstNameMessage, setFirstNameMessage ] = useState<string | undefined>(undefined)
  let [ lastName, setLastName ] = useState("")
  let [ lastNameMessage, setLastNameMessage ] = useState<string | undefined>(undefined)
  let [ displayName, setDisplayName ] = useState("")
  let [ displayNameMessage, setDisplayNameMessage ] = useState<string | undefined>(undefined)

  let [ createUserMessage, setCreateUserMessage ] = useState<string | undefined>(undefined)

  const checkUsername = () => {
    setCreateUserMessage(undefined)

    if(username.length > 0 && (username.length < 3 || username.length > 16)) {
      setUsernameMessage("Username must be between 3 and 16 characters long.")
      return
    } else if(username.length === 0) {
      setUsernameMessage("")
      return
    }

    if(!username.match(/^[a-zA-Z0-9]*$/)) {
      setUsernameMessage("Username must only contain alphanumeric characters.")
      return
    }

    fetch(window.location.origin + "/api/user/get/" + username, {
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if(res.status !== 404) {
        setUsernameMessage("Username is not available.")
      } else {
        setUsernameMessage(undefined)
      }
    })
  }

  const checkFirstName = () => {
    setCreateUserMessage(undefined)
    setFirstNameMessage("")

    if(firstName.length > 0 && firstName.length > 32) {
      setFirstNameMessage("First name must be between 1 and 32 characters long.")
      return
    } else if(firstName.length === 0) {
      setFirstNameMessage("")
      return
    }

    setFirstNameMessage(undefined)
  }

  const checkLastName = () => {
    setCreateUserMessage(undefined)
    setLastNameMessage("")

    if(lastName.length > 0 && lastName.length > 32) {
      setLastNameMessage("Last name must be between 1 and 32 characters long.")
      return
    } else if(lastName.length === 0) {
      setLastNameMessage("")
      return
    }

    setLastNameMessage(undefined)
  }

  const checkDisplayName = () => {
    setCreateUserMessage(undefined)
    setDisplayNameMessage("")

    if(displayName.length > 0 && displayName.length > 32) {
      setDisplayNameMessage("Display name must be between 1 and 32 characters long.")
      return
    } else if(displayName.length === 0) {
      setDisplayNameMessage("")
      return
    }

    setDisplayNameMessage(undefined)
  }

  useEffect(checkUsername, [username])
  useEffect(checkFirstName, [firstName])
  useEffect(checkLastName, [lastName])
  useEffect(checkDisplayName, [displayName])

  return (
    <>
      <div>
        <input type="text" className={styles.input} placeholder="First Name" style={{width: "47.5%", marginRight: "2.5%"}} onChange={(input) => setFirstName(input.currentTarget.value)} />
        <input type="text" className={styles.input} placeholder="Last Name" style={{width: "47.5%", marginLeft: "2.5%"}} onChange={(input) => setLastName(input.currentTarget.value)} />
      </div>
      <div>
        <input type="text" className={styles.input} placeholder="Username" style={{width: "100%"}} onChange={(input) => setUsername(input.currentTarget.value)} />
      </div>
      <div>
        <input type="text" className={styles.input} placeholder="Display Name" style={{width: "100%"}} onChange={(input) => setDisplayName(input.currentTarget.value)} />
      </div>
      <div>
        <button className={styles.inputSubmitButton} style={{width: "100%"}} disabled={firstNameMessage !== undefined && lastNameMessage !== undefined && usernameMessage !== undefined && displayNameMessage !== undefined} onClick={() => {
          if(firstNameMessage !== undefined || lastNameMessage !== undefined || usernameMessage !== undefined || displayNameMessage !== undefined) return

          fetch(window.location.origin + "/api/user/create", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username: username,
              first_name: firstName,
              last_name: lastName,
              display_name: displayName,
            }),
          }).then((res) => {
            if(res.status === 201) {
              window.location.href = "/app"
            } else {
              res.json().then((json) => {
                setCreateUserMessage(json.error)
              }).catch(() => {
                setCreateUserMessage(`An error occured: ${res.status} ${res.statusText ?? ""}`)
              })
            }
          })
        }}>Next</button>
      </div>
      <div>
        <p style={{color: "#f00"}}>{firstNameMessage ?? lastNameMessage ?? usernameMessage ?? displayNameMessage ?? createUserMessage ?? ""}</p>
      </div>
    </>
  )
}