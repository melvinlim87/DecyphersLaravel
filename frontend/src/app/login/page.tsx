"use client";
import React, { useEffect, useRef } from "react";

export default function LoginPage() {
  const telegramDivRef = useRef<HTMLDivElement>(null);
  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:8000/api/auth/google/redirect";
  };

  useEffect(() => {
    if (telegramDivRef.current) {
      const script = document.createElement("script");
      script.src = "https://telegram.org/js/telegram-widget.js?7";
      script.async = true;
      script.setAttribute("data-telegram-login", "LazeAIMarketAnalyzerBot");
      script.setAttribute("data-size", "large");
      script.setAttribute("data-userpic", "true");
      script.setAttribute("data-request-access", "write");
      script.setAttribute("data-auth-url", "http://decyphers.com/api/auth/telegram/callback");
      telegramDivRef.current.innerHTML = "";
      telegramDivRef.current.appendChild(script);
    }
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background:
          "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)",
        color: "#fff",
      }}
    >
      <h1 style={{ fontSize: 32, fontWeight: "bold", marginBottom: 24 }}>
        Login
      </h1>
      {/* Google Login Button */}
      <button
        onClick={handleGoogleLogin}
        style={{
          padding: "12px 32px",
          fontSize: 18,
          background: "#fff",
          color: "#6366f1",
          border: "none",
          borderRadius: 6,
          marginBottom: 32,
          cursor: "pointer",
          fontWeight: 600,
          boxShadow: "0 2px 8px rgba(99,102,241,0.12)",
        }}
      >
        Sign in with Google
      </button>
      {/* Telegram Login Widget */}
      <div style={{ margin: "32px 0 16px 0" }}>
        <div ref={telegramDivRef}></div>
      </div>
      {/* Placeholder for email/password login if needed */}
      {/* <form>...</form> */}
      <p style={{ marginTop: 32, color: "#e0e7ff" }}>
        Don't have an account? <a href="/register" style={{ color: "#a5b4fc" }}>Sign up</a>
      </p>
    </div>
  );
}
