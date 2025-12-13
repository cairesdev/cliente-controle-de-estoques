"use client";

import { ReactNode } from "react";
import { ToastContainer } from "react-toastify";

export default function AppTemplate({ children }: { children: ReactNode }) {
  return (
    <>
      <ToastContainer theme="light" />
      {children}
    </>
  );
}
