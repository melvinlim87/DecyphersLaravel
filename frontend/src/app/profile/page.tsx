"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import MainLayout from "../components/MainLayout";

export default function ProfilePage() {
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

  if (loading) {
    return (
      <MainLayout>
        <div style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <h1 style={{ fontSize: 32, fontWeight: "bold", color: "#6366f1" }}>
            Loading profile...
          </h1>
        </div>
      </MainLayout>
    );
  }

  // Example placeholders for tokens and purchase history
  const availableTokens = user?.availableTokens ?? 7700;
  const remainingAnalyses = user?.remainingAnalyses ?? 770;
  const accountCreated = user?.created_at ? new Date(user.created_at).toLocaleDateString() : '2/3/2025';
  const email = user?.email ?? 'jamestest@gmail.com';
  const name = user?.name ?? 'JamesTests';

  return (
    <MainLayout>
      <div style={{ maxWidth: 700, margin: "32px auto", background: "#fff", borderRadius: 16, boxShadow: "0 8px 32px rgba(99,102,241,0.10)", padding: 36 }}>
        {/* User Profile Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 32 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
            <div style={{ width: 80, height: 80, borderRadius: "50%", background: "#e0e7ff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 36, color: "#6366f1", fontWeight: 700 }}>
              {name[0]}
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 28, color: "#1e293b" }}>{name}</div>
              <div style={{ color: "#6366f1", fontWeight: 500, fontSize: 16 }}>User Profile</div>
            </div>
          </div>
          <button style={{ background: "#6366f1", color: "#fff", border: 0, borderRadius: 8, padding: "10px 28px", fontWeight: 600, fontSize: 16, cursor: "pointer", boxShadow: "0 2px 8px rgba(99,102,241,0.09)" }}>
            Edit Profile
          </button>
        </div>

        {/* Tokens Section */}
        <div style={{ background: "#f3f4f6", borderRadius: 12, padding: 28, marginBottom: 32, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <div style={{ fontWeight: 600, fontSize: 18, color: "#6366f1", marginBottom: 6 }}>Available Tokens</div>
            <div style={{ fontSize: 16, color: "#334155", marginBottom: 8 }}>You can analyze <b>{remainingAnalyses}</b> more charts</div>
            <div style={{ fontSize: 36, fontWeight: 700, color: "#4f46e5" }}>{availableTokens}</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <button style={{ background: "#fff", color: "#6366f1", border: "2px solid #6366f1", borderRadius: 8, padding: "8px 20px", fontWeight: 600, fontSize: 16, cursor: "pointer" }}>
              Get Free Tokens
            </button>
            <button style={{ background: "#6366f1", color: "#fff", border: 0, borderRadius: 8, padding: "8px 20px", fontWeight: 600, fontSize: 16, cursor: "pointer" }}>
              Buy Tokens
            </button>
          </div>
        </div>

        {/* Purchase History & Account Info */}
        <div style={{ display: "flex", gap: 32, flexWrap: "wrap" }}>
          <div style={{ flex: 1, minWidth: 260 }}>
            <div style={{ fontWeight: 600, fontSize: 18, color: "#6366f1", marginBottom: 8 }}>Purchase History</div>
            <div style={{ background: "#f9fafb", borderRadius: 8, padding: 16, color: "#64748b", minHeight: 80 }}>
              {/* Replace with real purchase history */}
              No purchases yet.
            </div>
          </div>
          <div style={{ flex: 1, minWidth: 260 }}>
            <div style={{ fontWeight: 600, fontSize: 18, color: "#6366f1", marginBottom: 8 }}>Account Details</div>
            <div style={{ background: "#f9fafb", borderRadius: 8, padding: 16, color: "#334155", fontSize: 16 }}>
              <div><b>Email:</b> {email}</div>
              <div style={{ marginTop: 8 }}><b>Account Created:</b> {accountCreated}</div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
