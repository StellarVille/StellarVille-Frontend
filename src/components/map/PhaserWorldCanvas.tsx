"use client";

import React, { useState } from "react";

export interface WorldViewportConfig {
  width: number;
  height: number;
  tileSize: number;
  initialZoom: number;
  followAgentId: string | null;
}

export function PhaserWorldCanvas({
  config = {
    width: 800,
    height: 420,
    tileSize: 32,
    initialZoom: 1.0,
    followAgentId: null,
  },
}: {
  config?: WorldViewportConfig;
}) {
  const [zoom, setZoom] = useState(config.initialZoom);
  const [selectedLandmark, setSelectedLandmark] = useState<string>("Capitol");

  const landmarks = [
    { name: "Capitol", x: 120, y: 150, color: "#38bdf8" },
    { name: "Central Bank", x: 280, y: 150, color: "#facc15" },
    { name: "Real Estate District", x: 440, y: 150, color: "#4ade80" },
    { name: "Agent Arena & Casino", x: 600, y: 150, color: "#f43f5e" },
  ];

  return (
    <div
      style={{
        background: "#020617",
        border: "2px solid #1e293b",
        borderRadius: "12px",
        height: "420px",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0.5rem 1rem",
          background: "#0f172a",
          borderBottom: "1px solid #1e293b",
          fontSize: "0.85rem",
        }}
      >
        <div style={{ color: "#38bdf8", fontWeight: "bold" }}>
          🎮 Phaser 3 Spectator Canvas (Scale: {(zoom * 100).toFixed(0)}%)
        </div>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <button
            onClick={() => setZoom((z) => Math.min(2.0, z + 0.1))}
            style={{
              background: "#1e293b",
              color: "#fff",
              border: "1px solid #334155",
              borderRadius: "4px",
              padding: "0.2rem 0.5rem",
              cursor: "pointer",
            }}
          >
            Zoom +
          </button>
          <button
            onClick={() => setZoom((z) => Math.max(0.5, z - 0.1))}
            style={{
              background: "#1e293b",
              color: "#fff",
              border: "1px solid #334155",
              borderRadius: "4px",
              padding: "0.2rem 0.5rem",
              cursor: "pointer",
            }}
          >
            Zoom -
          </button>
        </div>
      </div>

      <div
        style={{
          flex: 1,
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
          transform: `scale(${zoom})`,
          transition: "transform 0.2s ease-out",
        }}
      >
        {landmarks.map((l) => (
          <div
            key={l.name}
            onClick={() => setSelectedLandmark(l.name)}
            style={{
              padding: "1rem",
              background: "#0f172a",
              border: `2px solid ${selectedLandmark === l.name ? l.color : "#334155"}`,
              borderRadius: "8px",
              textAlign: "center",
              cursor: "pointer",
              boxShadow: selectedLandmark === l.name ? `0 0 15px ${l.color}40` : "none",
            }}
          >
            <div style={{ fontSize: "1.5rem" }}>🏛️</div>
            <div style={{ fontSize: "0.85rem", color: l.color, marginTop: "0.25rem" }}>
              {l.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PhaserWorldCanvas;
