import { SITE_URL } from "@/constants/enverioments";
import styles from "@/styles/homepage.module.css";
import Link from "next/link";
import { BsPersonFill } from "react-icons/bs";

export default async function RepresentantePage({
  searchParams,
}: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { username } = (await searchParams) as {
    [key: string]: string;
  };

  return (
    <main className={styles.homepage}>
      <div className={styles.header_section}>
        <h1>
          <BsPersonFill /> Usuario registrado com sucesso!
        </h1>
        <p>Cadastre um usuario para exercer funções.</p>
      </div>
      <div className="ghost_traco" />
      <h2>Usuário: {username}</h2>
      <Link href={`${SITE_URL}log-in?username=${username}`}>
        <p>Link de acesso</p>
      </Link>
    </main>
  );
}
