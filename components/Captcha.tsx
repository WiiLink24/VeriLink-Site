"use client"

import ReCAPTCHA from "react-google-recaptcha";

type CaptchaProps = {
    auth: any,
    onError: (error: string | null) => void
}

function Captcha ({ auth, onError }: CaptchaProps) {
    async function handleCaptchaSubmission(token: string | null) {
        const data = await fetch("http://localhost:3001/api/captcha", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ token, auth: auth.token }),
        }).then(res => res.json())

        if (!data.success) return onError(data.message)
        window.location.href = "http://localhost:3000/linked"
    }

    return (
        <div className="section">
            <ReCAPTCHA 
                sitekey="6LeopFopAAAAAHFNz2wZRzWzkVHrrAvqc-oNzHkl"
                onChange={handleCaptchaSubmission}
            />
        </div>
    )
}

export default Captcha