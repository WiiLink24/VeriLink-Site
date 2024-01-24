"use client"

import Image from "next/image";
import { useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";

export default function Home() {
  const recaptchaRef = useRef<ReCAPTCHA>(null)
  const [isVerified, setIsverified] = useState(false);
  async function handleCaptchaSubmission(token: string | null) {
    console.log(token)
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-6xl font-bold">
        Verilink
      </h1>
      <p className="mt-3 text-2xl">
        Verify your Discord account with ease.
      </p>
      <ReCAPTCHA 
        sitekey="6LeopFopAAAAAHFNz2wZRzWzkVHrrAvqc-oNzHkl"
        onChange={handleCaptchaSubmission}
      />
    </div> 
  )
}
