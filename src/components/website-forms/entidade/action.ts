"use server";
import { auth } from "@/auth";
import { API_ROUTES, HttpStatus } from "@/constants/type-guard";
import { backendFetch } from "@/services/adapter";
import { redirect } from "next/navigation";

export async function addEntidade(data: any) {
  const session = await auth();
  const token = session?.user.access_token;

  const response = await backendFetch({
    url: API_ROUTES.cadastro_entidade,
    next: { tags: ["entidaes"] },
    method: "POST",
    body: data,
    token,
  });

  if (response.status === HttpStatus.CREATED) {
    redirect(`/entidade/${response.body.res as string}/modulos?ref=new`);
  } else {
    redirect(
      `/entidade/nova-entidade?code=${response.status}&message=${encodeURI(
        response.body.message as string
      )}`
    );
  }
}

export async function addModulos(data: any) {
  const session = await auth();
  const token = session?.user.access_token;

  const response = await backendFetch({
    url: API_ROUTES.cadastro_modulo + "/" + data.ENTIDADE,
    next: { tags: ["entidades"] },
    method: "POST",
    body: data,
    token,
  });

  if (response.status === HttpStatus.CREATED) {
    redirect(`/tracks/cadastrado?ref=Entidade&callback=/`);
  } else {
    redirect(`/tracks/redirect?message=${response.body.message}&callback=/`);
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

export async function novoRepresentante(data: any) {
  const session = await auth();
  const token = session?.user.access_token;

  const response = await backendFetch({
    url: API_ROUTES.cadastro_representante,
    method: "POST",
    body: data,
    token,
  });

  if (data.SENHA !== data.SENHA_CHECK) {
    redirect(
      `/entidade/${data.ORGAO}/novo-representante?code=${HttpStatus.NOT_ACEPTABLE}`
    );
  }

  if (response.status === HttpStatus.CREATED) {
    console.log(response.body);
  } else {
    redirect(
      `/entidade/${data.ORGAO}/novo-representante?code=${response.status}`
    );
  }
}
