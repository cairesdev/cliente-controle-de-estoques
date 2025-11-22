import { auth } from "@/auth";
import { backendFetch } from "../adapter";
import { API_ROUTES } from "@/constants/type-guard";
import { ItemBasic } from "@/types/entidade";

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
    });

    return response.body.res;
  }

  async getUnidades() {
    const response = await backendFetch<ItemBasic[]>({
      url: API_ROUTES.lista_unidades + this.entidade,
      method: "GET",
      cache: "force-cache",
      token: this.token,
    });

    return response.body.res;
  }
}
