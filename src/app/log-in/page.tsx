"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/UI/button";
import styles from "@/styles/login.module.css";
import UserSVG from "@/assets/user_cell.svg";
import { signIn } from "next-auth/react";
import { useState } from "react";
import Image from "next/image";

export default function LogInPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    const res = await signIn("credentials", {
      username,
      password,
      redirect: false,
      callbackUrl,
    });

    if (res?.error) {
      setErrorMsg("Usuário ou senha inválidos.");
      setLoading(false);
      return;
    }

    router.push(callbackUrl);
  }

  return (
    <main className={styles.container_login}>
      <div className={styles.login_card}>
        <Image src={UserSVG} width={300} height={220} alt="usuario comum" />
        <div>
          <h1>Bem vindo ao Stockaap!</h1>
          <p>Preencha as informações para acessar o aplicativo</p>
        </div>
        <form onSubmit={handleSubmit} className={styles.formulario}>
          <div className={styles.input_container}>
            <label>Usuário</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="exemplo@gmail.com"
              required
            />
          </div>

          <div className={styles.input_container}>
            <label>Senha</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Digite sua senha"
              required
            />
          </div>

          {errorMsg && <span className={styles.error_message}>{errorMsg}</span>}
          <Button htmlType="submit" disabled={loading} rounded type="primary">
            {loading ? "Entrando..." : "Entrar"}
          </Button>
        </form>
      </div>
    </main>
  );
}
