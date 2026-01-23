"use client";

import { BiTrash } from "react-icons/bi";
import { Button } from "./UI/button";
import { EstoqueRepository } from "@/services/getters/estoque";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export function DeleteArmazem({ id, token }: { id: string; token: string }) {
  const router = useRouter();

  async function handleDelete() {
    const confirmar = confirm(
      "Tem certeza que deseja excluir este item?\nEssa ação não poderá ser desfeita.",
    );

    if (!confirmar) return;
    toast.warn("Apagando...");
    await EstoqueRepository.deleteEstoque({ id, token });
    toast.success("Deletado com sucesso");
    router.back();
  }

  return (
    <Button onClick={handleDelete} rounded type="danger" title="Excluir item">
      <BiTrash size={18} />
    </Button>
  );
}
export function DeleteItem({ id, token }: { id: string; token: string }) {
  const router = useRouter();

  async function handleDelete() {
    const confirmar = confirm(
      "Tem certeza que deseja excluir este item?\nEssa ação não poderá ser desfeita.",
    );

    if (!confirmar) return;

    await EstoqueRepository.deleteItemResumo({ id, token });
    toast.success("Deletado com sucesso");
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

export function GoBackButton() {
  const router = useRouter();

  return (
    <Button rounded type="danger" onClick={() => router.back()}>
      Voltar
    </Button>
  );
}

export function DeleteItemTipo({
  id,
  token,
  tipo,
}: {
  id: string;
  token: string;
  tipo: "unidade" | "estoque";
}) {
  const router = useRouter();

  async function handleDelete() {
    const confirmar = confirm(
      "Tem certeza que deseja excluir este item?\nEssa ação não poderá ser desfeita.",
    );

    if (!confirmar) return;

    await EstoqueRepository.deleteItemTipo({ id, token, tipo });
    toast.success("Deletado com sucesso");
    router.refresh();
  }

  return (
    <Button onClick={handleDelete} rounded type="danger" title="Excluir item">
      <BiTrash size={18} />
    </Button>
  );
}

export function DeleteUsuario({ id, token }: { id: string; token: string }) {
  const router = useRouter();

  async function handleDelete() {
    const confirmar = confirm(
      "Tem certeza que deseja excluir este usuario?\nEssa ação não poderá ser desfeita.",
    );

    if (!confirmar) return;

    await EstoqueRepository.deleteUsuario({ id, token });
    toast.success("Deletado com sucesso");
    router.refresh();
  }

  return (
    <Button
      onClick={handleDelete}
      rounded
      type="danger"
      title="Excluir Usuario"
    >
      <BiTrash size={18} />
    </Button>
  );
}
