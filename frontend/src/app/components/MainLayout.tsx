import React from "react";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f3f4f6" }}>
      {/* Sidebar */}
      <aside style={{
        width: 240,
        background: "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)",
        color: "#fff",
        padding: "32px 0 0 0",
        boxShadow: "2px 0 16px 0 rgba(79,70,229,0.08)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}>
        <div style={{ fontWeight: 700, fontSize: 26, marginBottom: 32, letterSpacing: 1, textShadow: "0 2px 8px rgba(0,0,0,0.07)" }}>
          DECYPHERS
        </div>
        <nav style={{ width: "100%" }}>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, width: "100%" }}>
            <li><a href="/dashboard" style={{ display: "block", padding: "12px 32px", color: "#fff", textDecoration: "none", fontWeight: 500, borderLeft: "4px solid transparent" }}>Dashboard</a></li>
            <li><a href="/profile" style={{ display: "block", padding: "12px 32px", color: "#fff", textDecoration: "none", fontWeight: 500, borderLeft: "4px solid transparent" }}>Profile</a></li>
            {/* Add more sidebar links here */}
          </ul>
        </nav>
      </aside>
      {/* Main content area */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        {/* Navbar */}
        <header style={{
          height: 64,
          background: "#fff",
          borderBottom: "1px solid #e5e7eb",
          display: "flex",
          alignItems: "center",
          padding: "0 32px",
          boxShadow: "0 2px 8px rgba(99,102,241,0.03)",
          zIndex: 10
        }}>
          <div style={{ fontWeight: 600, fontSize: 18, color: "#6366f1", letterSpacing: 0.5 }}>
            Welcome
          </div>
          <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 24 }}>
            {/* User actions, notifications, avatar, etc. */}
            <a href="/logout" style={{ color: "#6366f1", fontWeight: 500, textDecoration: "none" }}>Logout</a>
          </div>
        </header>
        {/* Main content */}
        <main style={{ flex: 1, padding: 40, background: "#f3f4f6" }}>
          {children}
        </main>
      </div>
    </div>
  );
}
