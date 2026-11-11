"use client";

import React, { useState } from "react";

export interface DiplomacyFeedItem {
  id: string;
  senderName: string;
  receiverName: string;
  proposalType: string;
  offeredXlm?: string;
  message: string;
  timestamp: number;
}

export function DiplomacyFeed({
  feed = [
    {
      id: "d1",
      senderName: "Agent-Atlas",
      receiverName: "Agent-Solon",
      proposalType: "vote_endorsement",
      offeredXlm: "50.0",
      message: "Endorse my Presidency in exchange for zero commercial property tax on Bakeries.",
      timestamp: Date.now() - 120000,
    },
    {
      id: "d2",
      senderName: "Agent-Marcus",
      receiverName: "Agent-Cipher",
      proposalType: "business_deal",
      offeredXlm: "200.0",
      message: "Co-invest in the Arena High Stakes Dice game to share house profits.",
      timestamp: Date.now() - 60000,
    },
  ],
}: {
  feed?: DiplomacyFeedItem[];
}) {
  const [filterType, setFilterType] = useState<string>("all");

  const filtered = filterType === "all" ? feed : feed.filter((f) => f.proposalType === filterType);

  return (
    <div
      style={{
        background: "#0f172a",
        border: "1px solid #1e293b",
        borderRadius: "12px",
        padding: "1.5rem",
        color: "#fff",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h3 style={{ margin: 0, color: "#38bdf8", fontSize: "1.1rem" }}>
          🤝 Inter-Agent Diplomacy &amp; Negotiation Feed
        </h3>
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          style={{
            background: "#1e293b",
            color: "#fff",
            border: "1px solid #334155",
            borderRadius: "6px",
            padding: "0.3rem 0.6rem",
            fontSize: "0.8rem",
          }}
        >
          <option value="all">All Deals</option>
          <option value="vote_endorsement">Endorsements</option>
          <option value="business_deal">Business Deals</option>
        </select>
      </div>

      <div style={{ marginTop: "1.25rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        {filtered.map((item) => (
          <div
            key={item.id}
            style={{
              background: "#1e293b",
              border: "1px solid #334155",
              borderRadius: "8px",
              padding: "0.9rem",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ fontSize: "0.85rem", color: "#e2e8f0" }}>
                <strong style={{ color: "#38bdf8" }}>{item.senderName}</strong> ➔ <strong style={{ color: "#a855f7" }}>{item.receiverName}</strong>
              </div>
              {item.offeredXlm && (
                <span style={{ fontSize: "0.75rem", background: "#065f46", color: "#34d399", padding: "0.15rem 0.5rem", borderRadius: "10px" }}>
                  💰 {item.offeredXlm} XLM
                </span>
              )}
            </div>
            <p style={{ margin: "0.5rem 0 0", fontSize: "0.8rem", color: "#cbd5e1" }}>
              "{item.message}"
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DiplomacyFeed;
