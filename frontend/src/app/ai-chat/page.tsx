"use client";
import React, { useState } from "react";
import MainLayout from "../components/MainLayout";

export default function AiChatPage() {
  const [input, setInput] = useState("");
  const [messages] = useState([
    {
      role: "system",
      content:
        "Hello! I can help you analyze market conditions and trading opportunities. Select an AI model and simply type to begin.",
    },
  ]);
  const [model, setModel] = useState("GPT-4o (14k, uncapped)");

  return (
    <MainLayout>
      <div
        style={{
          background: "#161b22",
          minHeight: "100vh",
          padding: "32px 0",
          color: "#fff",
        }}
      >
        <div style={{ maxWidth: 1600, margin: "0 auto", display: "flex", gap: 32 }}>
          {/* Left Panel: Chart Upload & Analysis */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 18 }}>
            <div style={{ background: "#1a1f26", borderRadius: 12, padding: 0, boxShadow: "0 2px 12px rgba(99,102,241,0.08)" }}>
              <div style={{ padding: 18, borderBottom: "1px solid #22272e", fontWeight: 600, fontSize: 18, color: "#a5b4fc" }}>
                AI Analysis Chat <span style={{ fontWeight: 400, fontSize: 13, color: "#64748b", marginLeft: 8 }}>(upload .jpg/.png)</span>
              </div>
              <div style={{ padding: 24, minHeight: 220, display: "flex", alignItems: "center", justifyContent: "center", border: "2px dashed #334155", borderRadius: 10, background: "#181d23", cursor: "pointer", margin: 18 }}>
                <div style={{ textAlign: "center", color: "#64748b" }}>
                  <div style={{ fontSize: 38, marginBottom: 12 }}>📤</div>
                  <div style={{ fontWeight: 500, marginBottom: 6 }}>Click to upload an image and analyze</div>
                  <div style={{ fontSize: 13 }}>PNG, JPG, max 4MB</div>
                </div>
              </div>
            </div>
            <div style={{ background: "#1a1f26", borderRadius: 12, padding: 0, boxShadow: "0 2px 12px rgba(99,102,241,0.08)" }}>
              <div style={{ padding: 14, borderBottom: "1px solid #22272e", fontWeight: 600, fontSize: 16, color: "#a5b4fc" }}>Analysis Results</div>
              <div style={{ padding: 18, minHeight: 80, color: "#cbd5e1" }}>
                {/* Analysis output would go here */}
                <span style={{ color: "#64748b" }}>No analysis yet.</span>
                <button style={{ float: "right", background: "#22272e", color: "#a5b4fc", border: 0, borderRadius: 6, padding: "6px 16px", fontWeight: 500, cursor: "pointer", marginLeft: 8 }}>Clear Analysis</button>
              </div>
              <div style={{ padding: 10, borderTop: "1px solid #22272e", background: "#181d23", textAlign: "center", fontSize: 14, color: "#64748b" }}>
                Upload a chart image to see the AI analysis here.
              </div>
            </div>
          </div>

          {/* Right Panel: AI Chat */}
          <div style={{ flex: 1.2, display: "flex", flexDirection: "column", gap: 18 }}>
            <div style={{ background: "#1a1f26", borderRadius: 12, padding: 0, boxShadow: "0 2px 12px rgba(99,102,241,0.08)", display: "flex", flexDirection: "column", height: 560 }}>
              <div style={{ padding: 18, borderBottom: "1px solid #22272e", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ fontWeight: 600, fontSize: 18, color: "#a5b4fc" }}>AI Analysis Chat</span>
                <select
                  value={model}
                  onChange={e => setModel(e.target.value)}
                  style={{
                    background: "#22272e",
                    color: "#a5b4fc",
                    border: "1px solid #22272e",
                    borderRadius: 8,
                    padding: "8px 12px",
                    fontSize: 15,
                  }}
                >
                  <option>GPT-4o (14k, uncapped)</option>
                  <option>GPT-4 Turbo</option>
                  <option>GPT-3.5 Turbo</option>
                </select>
              </div>
              <div style={{ flex: 1, padding: 24, overflowY: "auto" }}>
                {messages.map((msg, i) => (
                  <div key={i} style={{ color: msg.role === "system" ? "#a5b4fc" : "#fff", marginBottom: 16, background: msg.role === "system" ? "#23293b" : "#22272e", borderRadius: 8, padding: "12px 18px", maxWidth: "80%" }}>
                    {msg.content}
                  </div>
                ))}
              </div>
              <div style={{ borderTop: "1px solid #22272e", background: "#181d23", padding: 16, display: "flex", alignItems: "center", gap: 12 }}>
                <input
                  type="text"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  placeholder="Type your message..."
                  style={{
                    flex: 1,
                    background: "#22272e",
                    color: "#fff",
                    border: "1px solid #22272e",
                    borderRadius: 8,
                    padding: "12px 16px",
                    fontSize: 16,
                    outline: "none",
                  }}
                />
                <button
                  style={{
                    background: "#6366f1",
                    color: "#fff",
                    border: 0,
                    borderRadius: 8,
                    padding: "10px 24px",
                    fontWeight: 600,
                    fontSize: 16,
                    cursor: "pointer",
                    boxShadow: "0 2px 8px rgba(99,102,241,0.09)",
                  }}
                >
                  Send
                </button>
                <button style={{ background: "none", color: "#a5b4fc", border: 0, fontSize: 15, fontWeight: 500, marginLeft: 14, cursor: "pointer" }}>
                  New Conversation
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
