"use client";

import React from "react";

export interface NetworkStatusInfo {
  networkName: "Stellar Testnet" | "Stellar Mainnet";
  latestLedger: number;
  rpcLatencyMs: number;
  wsConnected: boolean;
}

export function NetworkHealthBadge({
  status = {
    networkName: "Stellar Testnet",
    latestLedger: 184520,
    rpcLatencyMs: 120,
    wsConnected: true,
  },
}: {
  status?: NetworkStatusInfo;
}) {
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.75rem",
        background: "#0f172a",
        padding: "0.4rem 0.8rem",
        borderRadius: "20px",
        border: "1px solid #334155",
        fontSize: "0.8rem",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
        <span
          style={{
            width: "8px",
            height: "8px",
            borderRadius: "50%",
            background: status.wsConnected ? "#22c55e" : "#ef4444",
            display: "inline-block",
          }}
        />
        <span style={{ color: "#e2e8f0" }}>{status.networkName}</span>
      </div>

      <span style={{ color: "#64748b" }}>•</span>

      <div style={{ color: "#94a3b8" }}>
        Ledger: <strong style={{ color: "#38bdf8" }}>#{status.latestLedger}</strong>
      </div>

      <span style={{ color: "#64748b" }}>•</span>

      <div style={{ color: "#94a3b8" }}>
        RPC:{" "}
        <strong
          style={{
            color: status.rpcLatencyMs < 200 ? "#4ade80" : "#f59e0b",
          }}
        >
          {status.rpcLatencyMs}ms
        </strong>
      </div>
    </div>
  );
}

export default NetworkHealthBadge;
