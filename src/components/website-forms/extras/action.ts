"use server";
import { auth } from "@/auth";
import { HttpStatus } from "@/constants/type-guard";
import { backendFetch } from "@/services/adapter";

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
