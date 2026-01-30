"use client"

import Constants from "./Constants"
import Turnstile from "react-turnstile";

type CaptchaProps = {
    auth: any,
    onError: (error: string | null) => void
}

function Captcha ({ auth, onError }: CaptchaProps) {
    async function handleCaptchaSubmission(token: string | null) {
        const data = await fetch(`${Constants.APIBaseURL}/api/captcha`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ token, auth: auth.token }),
        }).then(res => res.json())

        if (!data.success) return onError(data.message)
        window.location.href = `${window.location.href}linked`
    }

    return (
        <div className="section">
            <Turnstile
                sitekey="0x4AAAAAABtAWOdhIxZnNzMz"
                onSuccess={handleCaptchaSubmission}
                theme="dark"
            />
            <p>Secured by VeriLink</p>
        </div>
    )
}

export default Captcha
