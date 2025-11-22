"use client";

import { useEffect, useState } from "react";
import { signOut } from "next-auth/react";

export function useSessionTimer() {
  const [secondsLeft, setSecondsLeft] = useState<number | null>(null);

  useEffect(() => {
    const script = document.getElementById("session-data");
    if (!script || !script.textContent) return;

    const data = JSON.parse(script.textContent);
    const expiresAt = data.expires_on;

    if (!expiresAt) return;

    function updateTimer() {
      const now = Math.floor(Date.now() / 1000);
      const diff = expiresAt - now;

      if (diff <= 0) {
        setSecondsLeft(0);
        signOut();
        return;
      }

      setSecondsLeft(diff);
    }

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, []);

  return { secondsLeft };
}
