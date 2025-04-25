import React from "react";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f3f4f6" }}>
      {/* Sidebar */}
      <aside style={{
        width: 258,
        background: "linear-gradient(140deg, #3b3fda 0%, #6366f1 100%)",
        color: "#f3f4f6",
        padding: "36px 0 0 0",
        boxShadow: "2px 0 18px 0 rgba(60,60,140,0.16)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "100vh"
      }}>
        <div style={{ fontWeight: 800, fontSize: 28, marginBottom: 38, letterSpacing: 1.2, textShadow: "0 2px 16px rgba(0,0,0,0.10)" }}>
          DECYPHERS
        </div>
        <nav style={{ width: "100%" }}>
          {/* AI Chat Analyzer Section */}
          <div style={{
            background: "rgba(0,0,0,0.08)",
            borderRadius: 16,
            padding: "22px 22px 16px 22px",
            margin: "0 16px 18px 16px",
            boxShadow: "0 2px 12px rgba(60,60,140,0.06)",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 9, fontWeight: 700, fontSize: 16, color: "#e0e7ff", marginBottom: 2, letterSpacing: 0.1 }}>
              <span style={{ fontSize: 20 }}>💬</span> AI Chat Analyzer
            </div>
            <div style={{ fontSize: 13, color: "#dbeafe", margin: "10px 0 7px 0", fontWeight: 500 }}>Generate</div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              <li><a href="#" style={{ display: "flex", alignItems: "center", gap: 7, padding: "4px 0", color: "#e0e7ff", textDecoration: "none", fontSize: 14, borderRadius: 7, transition: "background 0.15s", fontWeight: 500, paddingLeft: 2, paddingRight: 2 }} onMouseOver={e=>e.currentTarget.style.background='#4f46e5'} onMouseOut={e=>e.currentTarget.style.background='transparent'}><span style={{ fontSize: 11 }}>●</span> Chat - 4/22/2025</a></li>
              <li><a href="#" style={{ display: "flex", alignItems: "center", gap: 7, padding: "4px 0", color: "#e0e7ff", textDecoration: "none", fontSize: 14, borderRadius: 7, transition: "background 0.15s", fontWeight: 500, paddingLeft: 2, paddingRight: 2 }} onMouseOver={e=>e.currentTarget.style.background='#4f46e5'} onMouseOut={e=>e.currentTarget.style.background='transparent'}><span style={{ fontSize: 11 }}>●</span> Chat - 4/22/2025</a></li>
              <li><a href="#" style={{ display: "flex", alignItems: "center", gap: 7, padding: "4px 0", color: "#e0e7ff", textDecoration: "none", fontSize: 14, borderRadius: 7, transition: "background 0.15s", fontWeight: 500, paddingLeft: 2, paddingRight: 2 }} onMouseOver={e=>e.currentTarget.style.background='#4f46e5'} onMouseOut={e=>e.currentTarget.style.background='transparent'}><span style={{ fontSize: 11 }}>●</span> Chat - 4/22/2025</a></li>
              <li><a href="#" style={{ display: "flex", alignItems: "center", gap: 7, padding: "4px 0", color: "#e0e7ff", textDecoration: "none", fontSize: 14, borderRadius: 7, transition: "background 0.15s", fontWeight: 500, paddingLeft: 2, paddingRight: 2 }} onMouseOver={e=>e.currentTarget.style.background='#4f46e5'} onMouseOut={e=>e.currentTarget.style.background='transparent'}><span style={{ fontSize: 11 }}>●</span> Chat - 4/22/2025</a></li>
              <li><a href="#" style={{ display: "flex", alignItems: "center", gap: 7, padding: "4px 0", color: "#e0e7ff", textDecoration: "none", fontSize: 14, borderRadius: 7, transition: "background 0.15s", fontWeight: 500, paddingLeft: 2, paddingRight: 2 }} onMouseOver={e=>e.currentTarget.style.background='#4f46e5'} onMouseOut={e=>e.currentTarget.style.background='transparent'}><span style={{ fontSize: 11 }}>●</span> Market Analysis - 15M</a></li>
            </ul>
            <a href="#" style={{ display: "flex", alignItems: "center", gap: 7, color: "#dbeafe", fontSize: 14, margin: "13px 0 0 0", textDecoration: "none", fontWeight: 500, borderRadius: 7, transition: "background 0.15s", padding: "5px 7px" }} onMouseOver={e=>e.currentTarget.style.background='#4f46e5'} onMouseOut={e=>e.currentTarget.style.background='transparent'}><span style={{ fontSize: 16 }}>🕒</span> See All History</a>
          </div>
          {/* Strategy Generator Section */}
          <div style={{
            background: "rgba(0,0,0,0.08)",
            borderRadius: 16,
            padding: "22px 22px 16px 22px",
            margin: "0 16px 0 16px",
            boxShadow: "0 2px 12px rgba(60,60,140,0.06)",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 9, fontWeight: 700, fontSize: 16, color: "#e0e7ff", marginBottom: 2, letterSpacing: 0.1 }}>
              <span style={{ fontSize: 20 }}>&lt;/&gt;</span> Strategy Generator
            </div>
            <div style={{ fontSize: 13, color: "#dbeafe", margin: "10px 0 7px 0", fontWeight: 500 }}>Generate EA</div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              <li><a href="#" style={{ display: "flex", alignItems: "center", gap: 7, padding: "4px 0", color: "#e0e7ff", textDecoration: "none", fontSize: 14, borderRadius: 7, transition: "background 0.15s", fontWeight: 500, paddingLeft: 2, paddingRight: 2 }} onMouseOver={e=>e.currentTarget.style.background='#4f46e5'} onMouseOut={e=>e.currentTarget.style.background='transparent'}><span style={{ fontSize: 11 }}>●</span> EA Generator - Custom...</a></li>
            </ul>
            <a href="#" style={{ display: "flex", alignItems: "center", gap: 7, color: "#dbeafe", fontSize: 14, margin: "13px 0 0 0", textDecoration: "none", fontWeight: 500, borderRadius: 7, transition: "background 0.15s", padding: "5px 7px" }} onMouseOver={e=>e.currentTarget.style.background='#4f46e5'} onMouseOut={e=>e.currentTarget.style.background='transparent'}><span style={{ fontSize: 16 }}>🕒</span> See All History</a>
          </div>
        </nav>
      </aside>
      {/* Main content area */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        {/* Navbar */}
        <header style={{
          height: 64,
          background: "#181d23",
          borderBottom: "1px solid #23293b",
          display: "flex",
          alignItems: "center",
          padding: "0 32px",
          boxShadow: "0 2px 8px rgba(99,102,241,0.03)",
          zIndex: 10
        }}>
          <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 18 }}>
            {/* Theme toggle */}
            <div style={{ background: "#10141a", borderRadius: 20, padding: "3px 10px", display: "flex", alignItems: "center", boxShadow: "0 0 0 2px #3b3f4a inset" }}>
              <span style={{ fontSize: 20, color: "#a5b4fc", marginRight: 2 }}>🌙</span>
              <span style={{ width: 28, height: 18, background: "#dbeafe", borderRadius: 10, margin: "0 6px", display: "inline-block" }}></span>
              <span style={{ fontSize: 18, color: "#fde68a", marginLeft: 2 }}>🌞</span>
            </div>
            {/* Token count */}
            <div style={{ background: "#23293b", color: "#a5b4fc", fontWeight: 600, borderRadius: 8, padding: "4px 18px", fontSize: 17, display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ fontSize: 20 }}>🪙</span> 7700
            </div>
            {/* User name */}
            <div style={{ color: "#e0e7ff", fontWeight: 500, fontSize: 16, display: "flex", alignItems: "center", gap: 7 }}>
              <span style={{ fontSize: 19 }}>👤</span> JamesTests
            </div>
            {/* Logout icon */}
            <a href="/logout" style={{ color: "#a5b4fc", fontWeight: 500, textDecoration: "none", display: "flex", alignItems: "center", gap: 5, fontSize: 16 }}>
              <span style={{ fontSize: 20 }}>↩️</span> Logout
            </a>
          </div>
        </header>
        {/* Main content */}
        <main style={{ flex: 1,  background: "#f3f4f6" }}>
          {children}
        </main>
      </div>
    </div>
  );
}
