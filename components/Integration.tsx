import Image from "next/image"
import Link from "next/link"
import React from "react"
import DiscordSVG from "../assets/images/integrations/discord.svg"
import GithubSVG from "../assets/images/integrations/github.svg"

type IntegrationProps = {
    provider: "discord" | "github",
    width?: string | number,
    height?: string | number,
}

const integrations = {
    "discord": {
        "authorizationURL": "https://discord.com/api/oauth2/authorize?client_id=1062493247508844695&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fapi%2Fcallback%2Fdiscord&response_type=code&scope=email%20identify",
        "backgroundColor": "#5a65ea",
        "color": "#fff",
        "displayName": "Discord",
        "icon": DiscordSVG,
    },
    "github": {
        "authorizationURL": `https://github.com/login/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID}&redirect_uri=http://localhost:3000/api/callback/github&scope=read:user%20user:email`,
        "backgroundColor": "#000",
        "color": "#fff",
        "displayName": "GitHub",
        "icon": GithubSVG,
    },
}

export default function Integration(props: IntegrationProps) {
    const provider = integrations[props.provider];

    return (
        <div style= {{ width: props["width"], height: props["height"], margin: "5px 0"}}>
            <Link href={provider["authorizationURL"]} style={{display: "block", width: "100%", height: "100%"}}>
                <div style={{
                    backgroundColor: provider["backgroundColor"],
                    display: "flex", 
                    borderRadius: 5,
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                    fontWeight: 500,
                    width: "100%", 
                    height: "100%",
                }}>
                    <div style={{height: "65%", width: "20%", position: "relative", marginRight: "5%"}}>
                        <Image src={provider["icon"]} alt={provider["displayName"]} fill={true} style={{fill: "#fff"}}/>
                    </div>
                    <div>
                        <p style={{color: provider["color"]}}>Login with {provider["displayName"]}</p>
                    </div>
                </div>
            </Link>
        </div>
    )
}
