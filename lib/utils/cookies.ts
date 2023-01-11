import { serialize, CookieSerializeOptions } from "cookie"
import { NextApiResponse } from "next"

/**
 * This sets `cookie` using the `res` object
 */

const setCookie = (
  res: NextApiResponse,
  name: string,
  value: unknown,
  options: CookieSerializeOptions = {}
) => {
  const stringValue =
    typeof value === "object" ? "j:" + JSON.stringify(value) : String(value)

  if (typeof options.maxAge === "number") {
    options.expires = new Date(Date.now() + options.maxAge * 1000)
  }

  res.setHeader("Set-Cookie", serialize(name, stringValue, options))
}

const setCookies = (
  res: NextApiResponse,
  name: string[],
  value: unknown[],
  options: CookieSerializeOptions[] = []
) => {
  if(name.length !== value.length || name.length !== options.length) throw new Error("Arrays must be the same length")
  if(name.length === 0) return

  const stringValues = value.map((v) => typeof v === "object" ? "j:" + JSON.stringify(v) : String(v))
  const expires = options.map((o) => typeof o.maxAge === "number" ? new Date(Date.now() + o.maxAge * 1000) : undefined)

  let cookies = []
  for(let i = 0; i < name.length; i++) {
    cookies.push(serialize(name[i], stringValues[i], { ...options[i], expires: expires[i] }))
  }

  res.setHeader("Set-Cookie", cookies)
}

export { setCookie, setCookies }
