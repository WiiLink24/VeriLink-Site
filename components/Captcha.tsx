"use client"

import ReCAPTCHA from "react-google-recaptcha";

type CaptchaProps = {
    auth: any
}

function Captcha ({ auth }: CaptchaProps) {
    async function handleCaptchaSubmission(token: string | null) {
        await fetch("http://localhost:3001/api/captcha", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ token, auth }),
        }).then(res => res.json())

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