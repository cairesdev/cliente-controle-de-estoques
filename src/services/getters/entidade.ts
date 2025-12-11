import { auth } from "@/auth";
import { backendFetch } from "../adapter";
import { API_ROUTES } from "@/constants/type-guard";
import { EntidadeDetalhe, ItemBasic, Produto } from "@/types/entidade";

export class EntidadeRepository {
  private constructor(
    private readonly entidade: string,
    private readonly token: string
  ) {}

  static async create(): Promise<EntidadeRepository> {
    const session = await auth();
    const entidade = session?.user.entidade_id as string;
    const token = session?.user.access_token as string;
    return new EntidadeRepository(entidade, token);
  }

  async getEntidades() {
    const response = await backendFetch<ItemBasic[]>({
      url: API_ROUTES.lista_entidades,
      method: "GET",
      cache: "force-cache",
      token: this.token,
      next: { tags: ["entidades"] },
    });

    return response.body.res;
  }

  async getEntidade({ id }: { id: string }) {
    const response = await backendFetch<EntidadeDetalhe>({
      url: API_ROUTES.entidade + id,
      method: "GET",
      cache: "force-cache",
      token: this.token,
      next: { tags: ["entidade", id] },
    });

    return response.body.res;
  }

  async getUnidades({ id }: { id: string }) {
    const response = await backendFetch<ItemBasic[]>({
      url: API_ROUTES.lista_unidades + id,
      method: "GET",
      cache: "force-cache",
      token: this.token,
      next: { tags: ["unidades", id] },
    });

    return response.body.res;
  }

  async getListaProdutos() {
    const response = await backendFetch<Produto[]>({
      url: API_ROUTES.lista_produtos,
      method: "GET",
      cache: "force-cache",
      token: this.token,
      next: { tags: ["produtos"] },
    });
    return response.body.res;
  }
}
