"use client";
import styles from "@/styles/sample/item_usuario.module.css";
import { Usuario } from "@/types/entidade";
import { Button } from "../button";
import { DeleteUsuario } from "@/components/action-buttons";
import { useRouter } from "next/navigation";

export default function ItemUsuario({
  item,
  token,
}: {
  item: Usuario;
  token: string;
}) {
  const router = useRouter();
  return (
    <div className={styles.item_usuario}>
      <h2>Usuario: {item.login}</h2>
      <p>
        Nome/cargo: {item.nome} - {item.descricao}
      </p>
      <div>
        <Button
          type="alternative"
          rounded
          onClick={() =>
            router.push(`/configuracoes/usuarios/renew-pass?user=${item.login}`)
          }
        >
          Alterar senha
        </Button>
        <DeleteUsuario id={item.id} token={token} />
      </div>
    </div>
  );
}
