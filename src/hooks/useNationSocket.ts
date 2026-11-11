"use client";

import { useState, useEffect, useCallback } from "react";

export interface IndexedSorobanEvent {
  id: string;
  topic: string;
  contractId: string;
  ledger: number;
  timestamp: number;
  data: any;
}

export interface NationSocketHook {
  connected: boolean;
  snapshot: any | null;
  recentEvents: IndexedSorobanEvent[];
  selectedAgentId: string | null;
  selectAgent: (id: string | null) => void;
}

export function useNationSocket(url: string = "ws://localhost:4001"): NationSocketHook {
  const [connected, setConnected] = useState<boolean>(false);
  const [snapshot, setSnapshot] = useState<any | null>(null);
  const [recentEvents, setRecentEvents] = useState<IndexedSorobanEvent[]>([]);
  const [selectedAgentId, setSelectedAgentId] = useState<string | null>(null);

  const selectAgent = useCallback((id: string | null) => {
    setSelectedAgentId(id);
  }, []);

  useEffect(() => {
    let ws: WebSocket | null = null;
    let timer: NodeJS.Timeout | null = null;

    function connect() {
      try {
        ws = new WebSocket(url);
        ws.onopen = () => setConnected(true);
        ws.onclose = () => {
          setConnected(false);
          timer = setTimeout(connect, 3000);
        };
        ws.onerror = () => {
          if (ws) ws.close();
        };
        ws.onmessage = (msg) => {
          try {
            const data = JSON.parse(msg.data);
            if (data.type === "SNAPSHOT") {
              setSnapshot(data.payload);
            } else if (data.type === "EVENT") {
              setRecentEvents((prev) => [data.payload, ...prev].slice(0, 50));
            }
          } catch {
            // Ignore parse errors
          }
        };
      } catch {
        timer = setTimeout(connect, 3000);
      }
    }

    connect();

    return () => {
      if (timer) clearTimeout(timer);
      if (ws) ws.close();
    };
  }, [url]);

  return {
    connected,
    snapshot,
    recentEvents,
    selectedAgentId,
    selectAgent,
  };
}
