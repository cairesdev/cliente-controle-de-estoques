"use server";
import { auth } from "@/auth";
import { API_ROUTES, HttpStatus } from "@/constants/type-guard";
import { backendFetch } from "@/services/adapter";

export async function addVeiculo(data: any) {
  const session = await auth();
  const token = session?.user.access_token;
  const entidade = session?.user.entidade_id;

  const response = await backendFetch({
    url: API_ROUTES.cadastro_veiculo + entidade,
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

export async function addSolicitacaoViagem(data: any) {
  const session = await auth();
  const token = session?.user.access_token;
  const entidade = session?.user.entidade_id;

  const response = await backendFetch({
    url: API_ROUTES.solicitacao_veicular + entidade + "/" + data.UNIDADE,
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

export async function liberarViagem(data: any) {
  const session = await auth();
  const token = session?.user.access_token;

  const response = await backendFetch({
    url: API_ROUTES.liberar_veiculo + data.SOLICITACAO + "/" + data.UNIDADE,
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

export async function iniciarViagem(data: any) {
  const session = await auth();
  const token = session?.user.access_token;

  const response = await backendFetch({
    url: API_ROUTES.liberar_veiculo + data.VIAGEM,
    method: "PUT",
    body: data,
    token,
  });

  if (response.status === HttpStatus.CREATED) {
    return true;
  } else {
    return false;
  }
}

export async function concluirViagem(data: any) {
  const session = await auth();
  const token = session?.user.access_token;

  const response = await backendFetch({
    url: `v1/garagem/viagens/${data.VIAGEM}/concluir`,
    method: "PUT",
    body: data,
    token,
  });

  if (response.status === HttpStatus.OK) {
    return true;
  } else {
    return false;
  }
}
