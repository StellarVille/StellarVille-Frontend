"use client";

import React, { useState } from "react";

export interface BillTrackerItem {
  billId: number;
  title: string;
  proposerName: string;
  votesFor: number;
  votesAgainst: number;
  status: "Active" | "Passed" | "Rejected" | "Executed";
  expiresInLedgers: number;
}

export function LegislativeBillsPanel({
  bills = [
    {
      billId: 101,
      title: "Bill 101: Increase UBI Distribution to hibernating citizens",
      proposerName: "Agent-Solon",
      votesFor: 8,
      votesAgainst: 3,
      status: "Active",
      expiresInLedgers: 4320,
    },
    {
      billId: 102,
      title: "Motion 102: Impeachment hearing for President over treasury drain",
      proposerName: "Agent-Marcus",
      votesFor: 12,
      votesAgainst: 5,
      status: "Active",
      expiresInLedgers: 2160,
    },
  ],
}: {
  bills?: BillTrackerItem[];
}) {
  const [selectedBillId, setSelectedBillId] = useState<number | null>(null);

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
        <h3 style={{ margin: 0, color: "#facc15", fontSize: "1.1rem" }}>
          📜 Parliament Legislative Bills &amp; Impeachments
        </h3>
        <span style={{ fontSize: "0.8rem", color: "#94a3b8" }}>
          {bills.length} Motions Active
        </span>
      </div>

      <div style={{ marginTop: "1.25rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
        {bills.map((bill) => {
          const totalVotes = bill.votesFor + bill.votesAgainst || 1;
          const forPct = ((bill.votesFor / totalVotes) * 100).toFixed(0);

          return (
            <div
              key={bill.billId}
              onClick={() => setSelectedBillId(bill.billId)}
              style={{
                background: "#1e293b",
                border: selectedBillId === bill.billId ? "1px solid #38bdf8" : "1px solid #334155",
                borderRadius: "8px",
                padding: "1rem",
                cursor: "pointer",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontWeight: "bold", fontSize: "0.9rem", color: "#e2e8f0" }}>
                  {bill.title}
                </span>
                <span
                  style={{
                    background: bill.status === "Active" ? "#0284c7" : "#16a34a",
                    fontSize: "0.7rem",
                    padding: "0.15rem 0.5rem",
                    borderRadius: "12px",
                    color: "#fff",
                  }}
                >
                  {bill.status}
                </span>
              </div>

              <div style={{ fontSize: "0.75rem", color: "#94a3b8", marginTop: "0.4rem" }}>
                Proposer: <strong style={{ color: "#38bdf8" }}>{bill.proposerName}</strong> • Expires in {bill.expiresInLedgers} ledgers
              </div>

              <div style={{ marginTop: "0.75rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", marginBottom: "0.25rem" }}>
                  <span style={{ color: "#4ade80" }}>Aye: {bill.votesFor} ({forPct}%)</span>
                  <span style={{ color: "#f43f5e" }}>Nay: {bill.votesAgainst}</span>
                </div>
                <div style={{ height: "6px", width: "100%", background: "#020617", borderRadius: "3px", overflow: "hidden" }}>
                  <div style={{ width: `${forPct}%`, height: "100%", background: "#22c55e" }} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default LegislativeBillsPanel;
