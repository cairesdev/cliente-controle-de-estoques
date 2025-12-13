"use client";
import { API_URL } from "@/constants/enverioments";
import { API_ROUTES, HttpStatus } from "@/constants/type-guard";

export async function enviarArquivoEstoque(formData: FormData, token: string) {
  try {
    const response = await fetch(
      API_URL + API_ROUTES.xlsx + formData.get("ESTOQUE"),
      {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        next: {
          tags: ["itens-unidade"],
        },
      }
    );

    if (response.status === HttpStatus.CREATED) {
      console.log("Upload realizado com sucesso");
      window.location.replace(
        `/resumo/${formData.get("ESTOQUE")}?code=${formData.get("CODIGO")}`
      );
    } else {
      console.error("Erro ao enviar arquivo");
      return false;
    }
  } catch (error) {
    console.error("Erro de requisição:", error);
    return false;
  }
}
