"use client";
import { useSessionTimer } from "@/services/hooks/useSessionTimer";
import { formatSeconds } from "@/utils";

export default function SessionExpiration() {
  const { secondsLeft } = useSessionTimer();
  return (
    <div>
      {secondsLeft !== null && <p>Expira em: {formatSeconds(secondsLeft)}s</p>}
    </div>
  );
}
