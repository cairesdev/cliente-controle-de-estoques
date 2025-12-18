import { auth } from "@/auth";
import { backendFetch } from "../adapter";
import { API_ROUTES } from "@/constants/type-guard";
import {
  ComprovanteCriacao,
  DetalheSolicitacao,
  ItemEstocado,
  LiberaProduto,
  ResumoRemessa,
  Solicitacao,
} from "@/types/commons";
import { Estoque } from "@/types/entidade";

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
      cache: "no-store",
      token: this.token,
      next: { tags: ["itens-unidade", id] },
    });

    return response.body.res;
  }

  async getAllItensUnidade({ id }: { id: string }) {
    const response = await backendFetch<ItemEstocado[]>({
      url: API_ROUTES.itens_estoque_unidade + id,
      method: "GET",
      cache: "no-store",
      token: this.token,
      next: { tags: ["itens-unidade", id] },
    });

    return response.body.res;
  }
  async getSolicitacoes({ id }: { id: string }) {
    const response = await backendFetch<Solicitacao[]>({
      url: API_ROUTES.solicitacoes + id,
      method: "GET",
      cache: "no-store",
      token: this.token,
      next: { tags: ["solicitacoes", id] },
    });

    return response.body.res;
  }

  async getSolicitacao({
    id,
    tipo,
    idUnidade,
  }: {
    id: string;
    tipo: "administrativa" | "unidade" | "almoxarifado";
    idUnidade: string;
  }) {
    const response = await backendFetch<DetalheSolicitacao>({
      url:
        API_ROUTES.solicitacao +
        id +
        `/unidade/${idUnidade}?visualizacao=${tipo}`,
      method: "GET",
      cache: "no-store",
      token: this.token,
      next: { tags: ["solicitacoes", id] },
    });

    return response.body.res;
  }

  async getSolicitacaoeComparaEstoque({
    id,
    entidade,
  }: {
    id: string;
    entidade: string;
  }) {
    const response = await backendFetch<LiberaProduto[]>({
      url: API_ROUTES.solicitacao + id + "/" + entidade,
      method: "GET",
      cache: "no-store",
      token: this.token,
      next: { tags: ["solicitacoes", id, entidade] },
    });

    return response.body.res;
  }

  async getComprovante({
    id,
    comprovante,
  }: {
    id: string;
    comprovante: string;
  }) {
    const response = await backendFetch<ComprovanteCriacao>({
      url: API_ROUTES.comprovante + id + "/" + comprovante,
      method: "GET",
      cache: "no-store",
      token: this.token,
      next: { tags: ["solicitacoes", id, comprovante] },
    });

    return response.body.res;
  }

  async getResumoEstoqueUnidade({ id }: { id: string }) {
    const response = await backendFetch<ResumoRemessa>({
      url: API_ROUTES.resumo_estoque_unidade + id,
      method: "GET",
      cache: "no-store",
      token: this.token,
      next: { tags: ["remessa", id] },
    });

    return response.body.res;
  }
  async getResumoEstoqueEntidade({ id }: { id: string }) {
    const response = await backendFetch<ResumoRemessa>({
      url: API_ROUTES.resumo_estoque + id,
      method: "GET",
      cache: "no-store",
      token: this.token,
      next: { tags: ["remessa", id] },
    });

    return response.body.res;
  }

  static async deleteItemResumo({ id, token }: { id: string; token: string }) {
    const response = await backendFetch<string>({
      url: API_ROUTES.delete_item + id,
      method: "DELETE",
      cache: "no-store",
      token: token,
      next: { tags: ["remessa", id] },
    });

    return response.body.res;
  }
  static async deleteEstoque({ id, token }: { id: string; token: string }) {
    const response = await backendFetch<string>({
      url: API_ROUTES.delete_remessa + id,
      method: "DELETE",
      cache: "no-store",
      token: token,
      next: { tags: ["remessa", id] },
    });

    return response.body.res;
  }

  async getEstoqueItens({ id }: { id: string }) {
    const response = await backendFetch<ItemEstocado[]>({
      url: API_ROUTES.lista_estoque + id,
      method: "GET",
      cache: "no-store",
      token: this.token,
      next: { tags: ["remessa", id] },
    });

    return response.body.res;
  }

  async getEstoqueUnidade({ id }: { id: string }) {
    const response = await backendFetch<Estoque[]>({
      url: API_ROUTES.unidade_estoque + id,
      method: "GET",
      cache: "no-store",
      token: this.token,
      next: { tags: [id] },
    });

    return response.body.res;
  }
  async getEstoqueEntidade({ id }: { id: string }) {
    const response = await backendFetch<Estoque[]>({
      url: API_ROUTES.entidade_estoque + id,
      method: "GET",
      cache: "no-store",
      token: this.token,
      next: { tags: [id] },
    });

    return response.body.res;
  }

  static async deleteItemTipo({
    id,
    token,
    tipo,
  }: {
    id: string;
    token: string;
    tipo: "unidade" | "estoque";
  }) {
    const response = await backendFetch<string>({
      url: `v1/extras/tipos/${tipo}/${id}`,
      method: "DELETE",
      cache: "no-store",
      token: token,
    });

    return response.body.res;
  }

  static async deleteUsuario({ id, token }: { id: string; token: string }) {
    const response = await backendFetch<string>({
      url: API_ROUTES.delete_usuario + id,
      method: "DELETE",
      cache: "no-store",
      token: token,
    });

    return response.body.res;
  }
}
