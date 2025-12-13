"use client";
import { API_ROUTES, HttpStatus } from "@/constants/type-guard";

export async function enviarArquivoEstoque(formData: FormData, token: string) {
  try {
    const response = await fetch(API_ROUTES.xlsx + formData.get("ESTOQUE"), {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === HttpStatus.CREATED) {
      console.log("Upload realizado com sucesso");
      window.location.replace(
        `/entidade/resumo/${formData.get("ESTOQUE")}?code=${formData.get(
          "CODIGO"
        )}`
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
