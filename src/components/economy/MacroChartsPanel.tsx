"use client";

import React from "react";

export interface MacroChartSeries {
  labels: string[];
  gdpXlm: number[];
  treasuryXlm: number[];
  taxRatePct: number[];
  interestRatePct: number[];
}

export function MacroChartsPanel({
  series = {
    labels: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6"],
    gdpXlm: [120, 145, 170, 160, 210, 240],
    treasuryXlm: [45, 52, 60, 68, 75, 88],
    taxRatePct: [1.5, 1.5, 1.75, 1.75, 2.0, 2.0],
    interestRatePct: [4.0, 4.0, 4.25, 4.25, 4.0, 3.75],
  },
}: {
  series?: MacroChartSeries;
}) {
  const maxGdp = Math.max(...series.gdpXlm, 1);

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
          📈 Macroeconomic Telemetry & GDP Velocity
        </h3>
        <span style={{ fontSize: "0.8rem", color: "#94a3b8" }}>
          6-Day Virtual Cycle
        </span>
      </div>

      <div style={{ marginTop: "1.25rem", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem" }}>
        <div style={{ background: "#1e293b", padding: "1rem", borderRadius: "8px" }}>
          <div style={{ fontSize: "0.8rem", color: "#94a3b8" }}>Current GDP Velocity</div>
          <div style={{ fontSize: "1.4rem", fontWeight: "bold", color: "#4ade80", marginTop: "0.25rem" }}>
            {series.gdpXlm[series.gdpXlm.length - 1]}k XLM
          </div>
        </div>
        <div style={{ background: "#1e293b", padding: "1rem", borderRadius: "8px" }}>
          <div style={{ fontSize: "0.8rem", color: "#94a3b8" }}>National Treasury</div>
          <div style={{ fontSize: "1.4rem", fontWeight: "bold", color: "#facc15", marginTop: "0.25rem" }}>
            {series.treasuryXlm[series.treasuryXlm.length - 1]}k XLM
          </div>
        </div>
      </div>

      <div style={{ marginTop: "1.5rem" }}>
        <div style={{ fontSize: "0.85rem", color: "#cbd5e1", marginBottom: "0.5rem" }}>
          Daily GDP Transaction Volume (in Thousands of XLM)
        </div>
        <div style={{ display: "flex", alignItems: "flex-end", height: "140px", gap: "1rem", background: "#020617", padding: "1rem", borderRadius: "8px" }}>
          {series.labels.map((label, idx) => {
            const heightPct = (series.gdpXlm[idx] / maxGdp) * 100;
            return (
              <div key={label} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", height: "100%", justifyContent: "flex-end" }}>
                <div
                  style={{
                    width: "100%",
                    height: `${heightPct}%`,
                    background: "linear-gradient(to top, #0284c7, #38bdf8)",
                    borderRadius: "4px 4px 0 0",
                    transition: "height 0.3s ease",
                  }}
                />
                <span style={{ fontSize: "0.7rem", color: "#64748b", marginTop: "0.4rem" }}>
                  {label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default MacroChartsPanel;
