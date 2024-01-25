"use client"

import Constants from "./Constants"

type DiscordOAuthProps = {
    authed: boolean
    doAuth: (code: string) => void
    user: any
}

function DiscordOAuth ({ authed, doAuth, user }: DiscordOAuthProps) {
    let oauth: any = null

    function startOAuth () {
        if (oauth) return
        oauth = window.open("https://discord.com/api/oauth2/authorize?client_id=1199919936722706432&redirect_uri=http://localhost:3000&response_type=code&scope=identify%20email", "popup", "popup=true")
        const checkPopup = setInterval(() => {
            // Watch for the popup to reach the endpoint and close itself
            if (oauth.window.location.href.includes(Constants.APIBaseURL)) {
                oauth.close()
                console.log(oauth.window.location.href)
                doAuth(oauth.window.location.href.split("?code=")[1])
            }

            // wait until it closes and then stop this watcher
            if (!oauth || !oauth.closed) return;
            clearInterval(checkPopup)
        }, 1000)
    }

    return (
        <div className="section">
            {!authed ?
                <button onClick={startOAuth} className="authenticate">Authenticate with Discord</button>
                :
                <div className="user">
                    <h1>{user.data.username}</h1>
                    <img alt="user-image" src={`https://cdn.discordapp.com/avatars/${user.data.id}/${user.data.avatar}.png`} width={32} height={32} />
                </div>
            }
        </div>
    )
}

export default DiscordOAuth