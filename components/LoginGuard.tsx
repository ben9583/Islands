import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { getServerSideUser, UserStatus } from "../lib/user"

// Normally you can't use async functions to return a React Component,
// but this is a server component so it's OK. 
// Typescript doesn't know that however, so we have this workaround.
interface PromiseJSXElement extends JSX.Element {}

export default async function LoginGuard({
  children,
}: {
  children: React.ReactNode;
  // @ts-ignore
}): PromiseJSXElement {
  const user = await getServerSideUser(cookies())

  if(user.status === UserStatus.DoesNotExist) {
    redirect("/login")
  } else if(user.status === UserStatus.NotRegistered) {
    redirect("/confirm-registration")
  }

  return (
    <>{children}</>
  )
}
