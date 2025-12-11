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

  async getSolicitacoes({ id }: { id: string }) {
    const response = await backendFetch<Solicitacao[]>({
      url: API_ROUTES.solicitacoes + id,
      method: "GET",
      cache: "force-cache",
      token: this.token,
      next: { tags: ["solicitacoes", id] },
    });

    return response.body.res;
  }

  async getSolicitacao({
    id,
    tipo,
  }: {
    id: string;
    tipo: "administrativa" | "unidade" | "almoxarifado";
  }) {
    const response = await backendFetch<DetalheSolicitacao>({
      url: API_ROUTES.solicitacao + id + `?visualizacao=${tipo}`,
      method: "GET",
      cache: "force-cache",
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
      cache: "force-cache",
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
      cache: "force-cache",
      token: this.token,
      next: { tags: ["solicitacoes", id, comprovante] },
    });

    return response.body.res;
  }

  async getResumo({ id }: { id: string }) {
    const response = await backendFetch<ResumoRemessa>({
      url: API_ROUTES.resumo_estoque + id,
      method: "GET",
      cache: "default",
      token: this.token,
      next: { tags: ["remessa", id] },
    });

    return response.body.res;
  }

  static async deleteItemResumo({ id, token }: { id: string; token: string }) {
    const response = await backendFetch<string>({
      url: API_ROUTES.delete_item + id,
      method: "DELETE",
      cache: "default",
      token: token,
      next: { tags: ["remessa", id] },
    });

    return response.body.res;
  }

  async getEstoqueItens({ id }: { id: string }) {
    const response = await backendFetch<ItemEstocado[]>({
      url: API_ROUTES.lista_estoque + id,
      method: "GET",
      cache: "default",
      token: this.token,
      next: { tags: ["remessa", id] },
    });

    return response.body.res;
  }
}
