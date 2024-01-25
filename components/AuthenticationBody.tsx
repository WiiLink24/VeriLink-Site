"use client"

import { useState } from "react"
import Captcha from "./Captcha"
import DiscordOAuth from "./DiscordOAuth"

function AuthenticationBody () {
    const [didAuth, setDidAuth] = useState(false)
    const [auth, setAuth] = useState(null)
    const [error, setError] = useState(null)

    async function doAuth (code: string) {
        const data = await fetch("http://localhost:3001/api/token", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify({ code }),
            }).then(res => res.json())
            
        if (data.message) return setError(data.message)
        setAuth(data)
        setDidAuth(true)
    }
    
    return (
        <>
            {error && <div className="error">{error}</div>}
            <DiscordOAuth doAuth={doAuth} user={auth} authed={didAuth} />
            {didAuth && <Captcha auth={auth} onError={setError} />}
        </>
    )
}

export default AuthenticationBody