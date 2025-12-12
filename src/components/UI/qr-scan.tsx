"use client";
import { useState } from "react";
import { Scanner } from "@yudiel/react-qr-scanner";
import { useRouter } from "next/navigation";
import styles from "@/styles/components/scan.module.css";
import { GoToHomeButton } from "../action-buttons";

export default function QRScaner() {
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
    <div className={styles.container}>
      <h1>Procurar por estoque</h1>
      <p>Digitalize o QR Code do estoque desejado</p>
      <div className={styles.scannerWrapper}>
        <Scanner
          formats={["qr_code"]}
          onScan={(detectedCodes) => {
            handleScan(detectedCodes[0].rawValue);
          }}
          components={{
            finder: true,
          }}
          allowMultiple={false}
          scanDelay={2000}
          paused={pause}
        />
      </div>

      <h2 className={styles.resultText}>{textQe}</h2>
      <GoToHomeButton />
    </div>
  );
}
