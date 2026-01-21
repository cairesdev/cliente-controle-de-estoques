import { auth } from "@/auth";
import { backendFetch } from "../adapter";
import { API_ROUTES } from "@/constants/type-guard";
import {
  EntidadeDetalhe,
  ItemBasic,
  ItemUnidade,
  Modulos,
  Produto,
  UnidadeDetalhe,
  Usuario,
  Veiculo,
} from "@/types/entidade";

export class EntidadeRepository {
  private constructor(
    private readonly entidade: string,
    private readonly token: string,
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
      cache: "no-store",
      token: this.token,
      next: { tags: ["entidades"] },
    });

    return response.body.res;
  }

  async getEntidade({ id }: { id: string }) {
    const response = await backendFetch<EntidadeDetalhe>({
      url: API_ROUTES.entidade + id,
      method: "GET",
      cache: "no-store",
      token: this.token,
      next: { tags: ["entidade", id] },
    });

    return response.body.res;
  }

  async getModulosDisponiveis({ id }: { id: string }) {
    const response = await backendFetch<Modulos>({
      url: API_ROUTES.entidade + id + "/modulos",
      method: "GET",
      cache: "no-store",
      token: this.token,
      next: { tags: ["entidade", id] },
    });

    return response.body.res;
  }

  async getUnidade({ id }: { id: string }) {
    const response = await backendFetch<UnidadeDetalhe>({
      url: API_ROUTES.detalhe_unidade + id,
      method: "GET",
      cache: "no-store",
      token: this.token,
      next: { tags: ["unidade", id] },
    });

    return response.body.res;
  }

  async getUnidades({ id }: { id: string }) {
    const response = await backendFetch<ItemUnidade[]>({
      url: API_ROUTES.lista_unidades + id,
      method: "GET",
      cache: "no-store",
      token: this.token,
      next: { tags: ["unidades", id] },
    });

    return response.body.res;
  }

  async getListaProdutos() {
    const response = await backendFetch<Produto[]>({
      url: API_ROUTES.lista_produtos,
      method: "GET",
      cache: "no-store",
      token: this.token,
      next: { tags: ["produtos"] },
    });
    return response.body.res;
  }

  async getListaVeiculos() {
    const response = await backendFetch<Veiculo[]>({
      url: API_ROUTES.lista_veiculos + "/" + this.entidade,
      method: "GET",
      cache: "no-store",
      token: this.token,
      next: { tags: ["veiculos"] },
    });
    return response.body.res;
  }

  async getListaTipoUnidade() {
    const response = await backendFetch<ItemBasic[]>({
      url: API_ROUTES.tipo_unidade,
      method: "GET",
      cache: "no-cache",
      token: this.token,
      next: { tags: ["tipo_unidade"] },
    });
    return response.body.res;
  }

  async getListadeUsuarios() {
    const response = await backendFetch<Usuario[]>({
      url: API_ROUTES.lista_usuarios,
      method: "PATCH",
      cache: "no-cache",
      token: this.token,
    });
    return response.body.res;
  }

  async getListaTipoEstoque() {
    const response = await backendFetch<ItemBasic[]>({
      url: API_ROUTES.tipo_estoque,
      method: "GET",
      cache: "no-store",
      token: this.token,
      next: { tags: ["tipo_estoque"] },
    });
    return response.body.res;
  }
}
