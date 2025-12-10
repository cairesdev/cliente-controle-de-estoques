"use client";

import { BiTrash } from "react-icons/bi";
import { Button } from "./UI/button";
import { EstoqueRepository } from "@/services/getters/estoque";
import { useRouter } from "next/navigation";

export function DeleteItem({ id, token }: { id: string; token: string }) {
  const router = useRouter();

  async function handleDelete() {
    const confirmar = confirm(
      "Tem certeza que deseja excluir este item?\nEssa ação não poderá ser desfeita."
    );

    if (!confirmar) return;

    await EstoqueRepository.deleteItemResumo({ id, token });
    router.refresh();
  }

  return (
    <Button onClick={handleDelete} rounded type="danger" title="Excluir item">
      <BiTrash size={18} />
    </Button>
  );
}

export function PrintPageButton() {
  return (
    <Button rounded onClick={() => window.print()}>
      Imprimir
    </Button>
  );
}
export function GoToHomeButton() {
  const router = useRouter();

  return (
    <Button rounded type="alternative" onClick={() => router.push("/")}>
      Concluir
    </Button>
  );
}
