import { auth } from "@/auth";
import { backendFetch } from "../adapter";
import { API_ROUTES } from "@/constants/type-guard";
import { ItemEstocado } from "@/types/commons";

export class EstoqueRepository {
  private constructor(private readonly token: string) {}

  static async create(): Promise<EstoqueRepository> {
    const session = await auth();
    const token = session?.user.access_token as string;
    return new EstoqueRepository(token);
  }

  async getItensEntidade({ id }: { id: string }) {
    const response = await backendFetch<ItemEstocado[]>({
      url: API_ROUTES.lista_itens_entidade + id,
      method: "GET",
      cache: "force-cache",
      token: this.token,
      next: { tags: ["itens-unidade", id] },
    });

    return response.body.res;
  }
}
