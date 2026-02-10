"use client";

import SessionExpiration from "@/components/session-expiration";
import { ReactNode } from "react";
import { ToastContainer } from "react-toastify";

export default function AppTemplate({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <ToastContainer theme="light" />
      <SessionExpiration />
    </>
  );
}
