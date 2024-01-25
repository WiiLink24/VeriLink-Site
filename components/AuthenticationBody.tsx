"use client"

import { useState } from "react"
import Captcha from "./Captcha"
import DiscordOAuth from "./DiscordOAuth"
import Constants from "./Constants"

function AuthenticationBody () {
    const [didAuth, setDidAuth] = useState(false)
    const [auth, setAuth] = useState(null)
    const [error, setError] = useState(null)

    async function doAuth (code: string) {
        const data = await fetch(`${Constants.APIBaseURL}/api/token`, {
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
    
    async function doCaptcha (response: any) {
        setError(response)
    }
    
    return (
        <>
            {error && <div className="error">{error}</div>}
            <div className="auth-container">
                <DiscordOAuth doAuth={doAuth} user={auth} authed={didAuth} />
                {didAuth && <Captcha auth={auth} onError={doCaptcha} />}
            </div>
        </>
    )
}

export default AuthenticationBody