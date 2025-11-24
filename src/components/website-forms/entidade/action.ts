"use server";
import { auth } from "@/auth";
import { API_ROUTES, HttpStatus } from "@/constants/type-guard";
import { backendFetch } from "@/services/adapter";
import { redirect } from "next/navigation";

export default async function addEntidade(data: any) {
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
