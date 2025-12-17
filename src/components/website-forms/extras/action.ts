"use server";
import { auth } from "@/auth";
import { API_ROUTES, HttpStatus } from "@/constants/type-guard";
import { backendFetch } from "@/services/adapter";
import { redirect } from "next/navigation";

export async function addTipo(data: any) {
  const session = await auth();
  const token = session?.user.access_token;

  const response = await backendFetch({
    url: `v1/extras/tipos/${data.TIPO}`,
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

export async function updateUsuario(data: any) {
  const session = await auth();
  const token = session?.user.access_token;

  const response = await backendFetch({
    url: API_ROUTES.update_pass + data.USER,
    method: "PUT",
    body: data,
    token,
  });

  if (data.SENHA !== data.SENHA_CHECK) {
    redirect(
      `/configuracoes/usuarios/renew-pass?code=${HttpStatus.NOT_ACEPTABLE}&user=${data.USER}`
    );
  }

  if (response.status === HttpStatus.OK) {
    redirect(
      `/tracks/cadastrado?ref=${encodeURI("Nova senha")}&callback=${encodeURI(
        `/configuracoes/usuarios`
      )}`
    );
  } else {
    redirect(
      `/configuracoes/usuarios/renew-pass?code=${response.status}&user=${data.USER}`
    );
  }
}
