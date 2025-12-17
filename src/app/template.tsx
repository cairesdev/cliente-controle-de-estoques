"use client";

import SessionExpiration from "@/components/session-expiration";
import { ReactNode } from "react";
import { ToastContainer } from "react-toastify";

export default function AppTemplate({ children }: { children: ReactNode }) {
  return (
    <>
      <ToastContainer theme="light" autoClose={4000} />
      {children}
      <SessionExpiration />
    </>
  );
}
