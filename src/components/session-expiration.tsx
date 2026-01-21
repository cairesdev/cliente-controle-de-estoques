"use client";
import { useSessionTimer } from "@/services/hooks/useSessionTimer";
import { formatSeconds } from "@/utils";

export default function SessionExpiration() {
  const { secondsLeft } = useSessionTimer();
  return <span style={{ fontSize: "1px" }}>{secondsLeft}</span>;
}
