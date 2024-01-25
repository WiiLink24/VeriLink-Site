"use client"

import HCaptcha from "@hcaptcha/react-hcaptcha";
import Constants from "./Constants"

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
        window.location.href = `${window.location.href}/linked`
    }

    return (
        <div className="section">
            <HCaptcha 
                sitekey="a2be32d6-a4d0-416d-8302-d1c66c046c2f"
                onVerify={handleCaptchaSubmission}
            />
            <p>Secured by VeriLink</p>
        </div>
    )
}

export default Captcha