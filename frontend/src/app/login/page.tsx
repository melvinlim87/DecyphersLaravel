"use client";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/api";

export default function LoginPage() {
  const router = useRouter();
  const telegramDivRef = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:8000/api/auth/google/redirect";
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await api.post('/login', { email, password });
      console.log('Login successful:', response.data);
      const { token } = response.data;
      if (token) {
        localStorage.setItem('auth_token', token);
        router.push('/dashboard');
      }
    } catch (err: any) {
      console.error('Login failed:', err);
      setError(err?.response?.data?.message || 'Invalid email or password.');
    } finally {
      setIsLoading(false);
    }
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
      {/* Email/Password Login Form */}
      <form onSubmit={handleLogin} style={{ width: "100%", maxWidth: 400, marginTop: 24 }}>
        {error && (
          <div style={{ color: "#f87171", marginBottom: 16, textAlign: "center" }}>
            {error}
          </div>
        )}
        <div style={{ marginBottom: 16 }}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            style={{
              width: "100%",
              padding: "12px 16px",
              borderRadius: 6,
              border: "1px solid #a5b4fc",
              fontSize: 16,
              backgroundColor: "rgba(255, 255, 255, 0.9)",
              color: "#1f2937",
            }}
          />
        </div>
        <div style={{ marginBottom: 24 }}>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            style={{
              width: "100%",
              padding: "12px 16px",
              borderRadius: 6,
              border: "1px solid #a5b4fc",
              fontSize: 16,
              backgroundColor: "rgba(255, 255, 255, 0.9)",
              color: "#1f2937",
            }}
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          style={{
            width: "100%",
            padding: "12px 16px",
            backgroundColor: "#4f46e5",
            color: "white",
            border: "none",
            borderRadius: 6,
            fontSize: 16,
            fontWeight: 600,
            cursor: isLoading ? "not-allowed" : "pointer",
            opacity: isLoading ? 0.7 : 1,
          }}
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </form>
      <div style={{ margin: "24px 0", width: "100%", maxWidth: 400, textAlign: "center" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ flex: 1, height: 1, backgroundColor: "rgba(255, 255, 255, 0.3)" }} />
          <span style={{ margin: "0 16px", color: "#e0e7ff" }}>OR</span>
          <div style={{ flex: 1, height: 1, backgroundColor: "rgba(255, 255, 255, 0.3)" }} />
        </div>
      </div>
      <p style={{ marginTop: 32, color: "#e0e7ff" }}>
        Don't have an account? <a href="/register" style={{ color: "#a5b4fc" }}>Sign up</a>
      </p>
    </div>
  );
}
