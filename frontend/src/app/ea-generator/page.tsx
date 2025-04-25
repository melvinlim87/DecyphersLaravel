"use client";
import React, { useState } from "react";
import MainLayout from "../components/MainLayout";

const strategyGuide = [
  [
    "Indicator Settings",
    "Moving Average periods (SMA/EMA)",
    "RSI period and level",
    "Bollinger Band settings",
  ],
  [
    "Entry Rules",
    "Indicator crossovers",
    "Price action patterns",
    "Support/resistance levels",
  ],
  [
    "Exit Rules",
    "Set profit targets",
    "Stop loss placement",
    "Trailing stop settings",
  ],
  [
    "Risk Management",
    "Position sizing",
    "Max/min open positions",
    "Trading session",
  ],
];

export default function EaGeneratorPage() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "system",
      content:
        "Welcome! I'm ready to help you create your Expert Advisor.\n\nLet me help you develop a complete trading strategy. Please provide details about:\n\n1. What pair(s)/markets do you want to trade?\n2. Entry rules?\n3. Exit rules?\n4. Risk settings?\n5. Any special features?\n\nExample:\n- Symbol: EURUSD\n- Entry: Buy when 50SMA crosses above 200SMA and RSI(14) is below 30\n- Exit: Take profit 100 pips, stop loss 50 pips\n- Risk: 2% per trade\n- Features: Only trade London session.\n\nPaste your strategy below!",
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
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <h1 style={{ fontSize: 34, fontWeight: 700, letterSpacing: 1, marginBottom: 24, textAlign: "center" }}>
            EA Generator
          </h1>

          {/* Strategy Guide */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 18,
              marginBottom: 28,
            }}
          >
            {strategyGuide.map((col, i) => (
              <div
                key={i}
                style={{
                  background: "#22272e",
                  borderRadius: 10,
                  padding: 18,
                  minHeight: 120,
                  boxShadow: "0 2px 8px rgba(99,102,241,0.08)",
                }}
              >
                <div style={{ fontWeight: 600, fontSize: 16, color: "#a5b4fc", marginBottom: 8 }}>{col[0]}</div>
                <ul style={{ margin: 0, padding: 0, color: "#cbd5e1", fontSize: 15, listStyle: "disc inside" }}>
                  {col.slice(1).map((item, j) => (
                    <li key={j}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Trading Strategy Analyzer */}
          <div
            style={{
              background: "#1a1f26",
              borderRadius: 12,
              padding: 0,
              marginBottom: 32,
              boxShadow: "0 2px 12px rgba(99,102,241,0.08)",
              overflow: "hidden",
            }}
          >
            <div style={{ padding: 20, borderBottom: "1px solid #22272e", fontWeight: 600, fontSize: 18, color: "#a5b4fc" }}>
              Trading Strategy Analyzer
            </div>
            <div style={{ padding: 24, minHeight: 260, maxHeight: 340, overflowY: "auto" }}>
              {messages.map((msg, i) => (
                <div key={i} style={{ color: msg.role === "system" ? "#cbd5e1" : "#fff", marginBottom: 16, whiteSpace: "pre-line" }}>
                  {msg.content}
                </div>
              ))}
            </div>
            <div style={{ background: "#161b22", borderTop: "1px solid #22272e", padding: 18, display: "flex", alignItems: "center", gap: 12 }}>
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Type your strategy..."
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
                  marginRight: 8,
                }}
              >
                <option>GPT-4o (14k, uncapped)</option>
                <option>GPT-4 Turbo</option>
                <option>GPT-3.5 Turbo</option>
              </select>
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
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
