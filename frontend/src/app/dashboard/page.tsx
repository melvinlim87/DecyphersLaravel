"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import MainLayout from "../components/MainLayout";

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
      <MainLayout>
        <div style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <h1 style={{ fontSize: 32, fontWeight: "bold", color: "#6366f1" }}>
            Loading user info...
          </h1>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <h1 style={{ fontSize: 32, fontWeight: "bold", marginBottom: 24 }}>
        Welcome to the Dashboard!
      </h1>
      <div style={{ fontSize: 18, marginBottom: 16 }}>
        {user ? (
          <>
            <div><strong>Name:</strong> {user.name}</div>
            <div><strong>Email:</strong> {user.email}</div>
          </>
        ) : (
          <div>User info not available.</div>
        )}
      </div>
      <button onClick={handleLogout} style={{ padding: "10px 24px", background: "#6366f1", color: "#fff", border: "none", borderRadius: 6, fontWeight: 600, fontSize: 16, cursor: "pointer" }}>
        Logout
      </button>
    </MainLayout>
  );
}
