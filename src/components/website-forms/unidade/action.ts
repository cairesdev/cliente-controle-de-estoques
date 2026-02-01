"use server";
import { auth } from "@/auth";
import { API_ROUTES, HttpStatus } from "@/constants/type-guard";
import { backendFetch } from "@/services/adapter";
import { redirect, RedirectType } from "next/navigation";

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
      `/comprovante/${response.body.res?.id}?code=${response.body.res?.codigo}`,
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

export async function adicionarUnidade(data: any) {
  const session = await auth();
  const token = session?.user.access_token;

  const response = await backendFetch<string>({
    url: API_ROUTES.cadastro_unidade + data.ENTIDADE,
    next: { tags: ["solicitacoes", data.ENTIDADE] },
    method: "POST",
    body: data,
    token,
  });

  if (response.status === HttpStatus.CREATED) {
    redirect(`/entidade/${data.ENTIDADE}/almoxarifado`, RedirectType.push);
  } else {
    return false;
  }
}
export async function novaSolicitacao(data: any) {
  const session = await auth();
  const token = session?.user.access_token;

  const response = await backendFetch<string>({
    url: API_ROUTES.cadastro_solicitacao + data.UNIDADE,
    next: { tags: ["solicitacoes", data.UNIDADE] },
    method: "POST",
    body: data,
    token,
  });

  if (response.status === HttpStatus.CREATED) {
    redirect(
      `/tracks/cadastrado?ref=${encodeURI("Solicitação")}&callback=${encodeURI(
        `/unidade/${data.UNIDADE}/nova-solicitacao/${response.body.res}?categoria=${data.TIPO_ESTOQUE}`,
      )}`,
      RedirectType.push,
    );
  } else {
    return false;
  }
}

export async function adicionarItensSolicitacao(data: any) {
  const session = await auth();
  const token = session?.user.access_token;

  const response = await backendFetch<string>({
    url:
      API_ROUTES.cadastro_solicitacao + "itens/adicionar/" + data.SOLICITACAO,
    next: {
      tags: ["solicitacoes", data.SOLICITACAO, data.UNIDADE, "solicitacao"],
    },
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

export async function updateItemUtilizado(data: any) {
  const session = await auth();
  const token = session?.user.access_token;

  const response = await backendFetch<boolean>({
    url: API_ROUTES.utilizar_item + data.PRODUTO,
    method: "PATCH",
    body: data,
    token,
  });

  if (response.status === HttpStatus.OK) {
    return true;
  } else {
    return false;
  }
}

export async function editarUnidade(data: any) {
  const session = await auth();
  const token = session?.user.access_token;

  const response = await backendFetch<string>({
    url: API_ROUTES.detalhe_unidade + data.ID,
    next: { tags: ["unidades", data.ID] },
    method: "PATCH",
    body: data,
    token,
  });

  if (response.status === HttpStatus.OK) {
    redirect(`/unidade/${data.ID}/almoxarifado`, RedirectType.push);
  } else {
    return false;
  }
}
