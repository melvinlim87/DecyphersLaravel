"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AuthCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    // Get token from query string
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    if (token) {
      // Store token in localStorage (or cookie if you want)
      localStorage.setItem("auth_token", token);
      // Redirect to dashboard
      router.replace("/dashboard");
    } else {
      // No token, redirect to login
      router.replace("/login");
    }
  }, [router]);

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
        Logging you in...
      </h1>
    </div>
  );
}
