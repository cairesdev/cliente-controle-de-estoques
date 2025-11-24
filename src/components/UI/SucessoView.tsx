"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "@/styles/tracks.module.css";
import { FaCheckCircle } from "react-icons/fa";

export default function SucessoView({
  refId,
  callback,
}: {
  refId?: string;
  callback?: string;
}) {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (callback) router.push(callback);
    }, 3000);

    return () => clearTimeout(timer);
  }, [callback, router]);

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <FaCheckCircle className={styles.icone} />
        <h1 className={styles.titulo}>Cadastro concluído!</h1>
        {refId && <p className={styles.ref}>Referência: {refId}</p>}

        {callback && <p className={styles.redirecionando}>Redirecionando…</p>}
      </div>
    </div>
  );
}
