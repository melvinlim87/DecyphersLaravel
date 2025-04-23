"use client";
import React from "react";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    if (!token) {
      router.replace("/login");
      return;
    }
    fetch("http://localhost:8000/api/user", {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    })
      .then(async (res) => {
        if (!res.ok) {
          localStorage.removeItem("auth_token");
          router.replace("/login");
          return;
        }
        const data = await res.json();
        setUser(data);
        setLoading(false);
      })
      .catch(() => {
        localStorage.removeItem("auth_token");
        router.replace("/login");
      });
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    router.replace("/login");
  };

  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)",
          color: "#fff",
        }}
      >
        <h1 style={{ fontSize: 32, fontWeight: "bold", marginBottom: 24 }}>
          Loading user info...
        </h1>
      </div>
    );
  }
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
        Dashboard
      </h1>
      <div style={{ fontSize: 20, color: "#e0e7ff", marginBottom: 32 }}>
        <div><strong>Name:</strong> {user?.name}</div>
        <div><strong>Email:</strong> {user?.email}</div>
      </div>
      <button
        onClick={handleLogout}
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
        Logout
      </button>
    </div>
  );
}
