"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "@/styles/components/erro_view.module.css";
import { MdErrorOutline } from "react-icons/md";

export default function ErroView({
  message,
  callback,
}: {
  message?: string;
  callback?: string;
}) {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (callback) router.push(callback);
    }, 3500);

    return () => clearTimeout(timer);
  }, [callback, router]);

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <MdErrorOutline className={styles.icone} />

        <h1 className={styles.titulo}>Algo deu errado</h1>

        {message && <p className={styles.mensagem}>{decodeURI(message)}</p>}

        {callback && (
          <p className={styles.redirecionando}>Tentando novamente…</p>
        )}
      </div>
    </div>
  );
}
