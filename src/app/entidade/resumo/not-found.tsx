import { GoBackButton } from "@/components/action-buttons";
import styles from "@/styles/sample/notfound.module.css";

export default function NotFoundPage() {
  return (
    <main className={styles.container}>
      <section className={styles.card}>
        <div className={styles.icon}>📦</div>

        <h1 className={styles.title}>Estoque não encontrado</h1>

        <p className={styles.description}>
          O estoque selecionado não existe, foi removido ou está corrompido.
          Verifique se o item foi selecionado corretamente e volte para a tela
          anterior.
        </p>

        <div className={styles.actions}>
          <GoBackButton />
        </div>
      </section>
    </main>
  );
}
