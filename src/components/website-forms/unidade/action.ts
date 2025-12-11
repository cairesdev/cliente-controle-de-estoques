"use server";
import { auth } from "@/auth";
import { API_ROUTES, HttpStatus } from "@/constants/type-guard";
import { backendFetch } from "@/services/adapter";
import { redirect } from "next/navigation";

export async function liberaDemanda(data: any) {
  const session = await auth();
  const token = session?.user.access_token;

  const response = await backendFetch<{ codigo: string; id: string }>({
    url: API_ROUTES.solicitacao + data.SOLICITACAO + "/" + data.ENTIDADE,
    next: { tags: ["solicitacoes"] },
    method: "POST",
    body: data,
    token,
  });

  if (response.status === HttpStatus.CREATED) {
    redirect(
      `/comprovante/${response.body.res?.id}?code=${response.body.res?.codigo}`
    );
  } else {
    console.log(response.body);
  }
}

export async function criarArmazenamento(data: any) {
  const session = await auth();
  const token = session?.user.access_token;

  const response = await backendFetch<{ codigo: string; id: string }>({
    url: API_ROUTES.armazem_estoque + data.ENTIDADE,
    next: { tags: ["solicitacoes"] },
    method: "POST",
    body: data,
    token,
  });

  if (response.status === HttpStatus.CREATED) {
    redirect(
      `/nova-remessa/${data.ENTIDADE}/${response.body.res?.id}?type=new&method=${data.PLAN_TIPO}&code=${response.body.res?.codigo}`
    );
  } else {
    console.log(response.body);
  }
}

export async function adicionarProduto(data: any) {
  const session = await auth();
  const token = session?.user.access_token;

  const response = await backendFetch<string>({
    url: API_ROUTES.cadastro_produto_individual + data.REMESSA,
    next: { tags: ["solicitacoes"] },
    method: "POST",
    body: data,
    token,
  });

  if (response.status === HttpStatus.CREATED) {
    return true;
  } else {
    return false;
  }
}
