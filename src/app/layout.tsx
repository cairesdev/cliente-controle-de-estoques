import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { auth } from "@/auth";

const interSans = Inter({
  variable: "--font-inter-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Controle de Estoques",
  description: "Gerenciamento online de seu almoxarifado.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <html lang="pt-br">
      <body className={interSans.variable}>
        {children}
        <script
          id="session-data"
          type="application/json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ expires_on: session?.user?.expires_on }),
          }}
        />
      </body>
    </html>
  );
}
