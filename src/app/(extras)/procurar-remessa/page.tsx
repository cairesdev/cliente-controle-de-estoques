"use client";
import { useState } from "react";
import { Scanner } from "@yudiel/react-qr-scanner";
import { useRouter } from "next/navigation";
import styles from "@/styles/components/scan.module.css";
import { GoBackButton } from "@/components/action-buttons";

export default function QRScanerPage() {
  const [pause, setPause] = useState(false);
  const [textQe, setTextQr] = useState<string>("");

  const router = useRouter();

  const handleScan = async (data: string) => {
    setPause(true);
    setTextQr(data);

    const parts = data.split(":");

    if (parts.length === 3) {
      const code = parts[0];
      const tipo = parts[1];
      const id = parts[2];

      const url = `${tipo}/resumo/${id}?code=${code}&tipo=0`;
      router.push(url);
    }
  };

  return (
    <main className={styles.container}>
      <div className={styles.header}>
        <h1>Procurar por estoque</h1>
        <p>Digitalize o QR Code do estoque desejado</p>
      </div>

      <div className={styles.scannerWrapper}>
        <Scanner
          formats={["qr_code"]}
          onScan={(detectedCodes) => {
            handleScan(detectedCodes[0].rawValue);
          }}
          components={{ finder: true }}
          allowMultiple={false}
          scanDelay={2000}
          paused={pause}
        />
      </div>

      {textQe && (
        <p className={styles.resultText}>
          Código identificado: <strong>{textQe}</strong>
        </p>
      )}

      <div className={styles.footer}>
        <GoBackButton />
      </div>
    </main>
  );
}
