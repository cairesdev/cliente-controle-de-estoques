"use client";
import { toast } from "react-toastify";
import { HttpStatus } from "@/constants/type-guard";

export async function enviarArquivoEstoque(formData: FormData, token: string) {
  try {
    const response = await fetch(
      "https://aeapi.workcenter.slz.br/v1/armazem/xlsx",
      {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status === HttpStatus.CREATED) {
      toast.success("Upload realizado com sucesso");

      const codigo = formData.get("CODIGO");
      window.location.replace(`/entidade/resumo/${codigo}`);
      return true;
    }

    const error = await response.text();
    console.error("Erro da API:", error);
    return false;
  } catch (err) {
    console.error("Erro de rede:", err);
    return false;
  }
}
