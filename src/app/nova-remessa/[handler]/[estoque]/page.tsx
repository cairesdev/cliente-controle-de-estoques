import { auth } from "@/auth";
import ItemArmazenado from "@/components/UI/item-estoque";
import AddByFile from "@/components/website-forms/unidade/add-by-file";
import FormByItemProduto from "@/components/website-forms/unidade/add-by-list";
import { EntidadeRepository } from "@/services/getters/entidade";
import { EstoqueRepository } from "@/services/getters/estoque";
import styles from "@/styles/homepage.module.css";
import Link from "next/link";

import { LuLayers } from "react-icons/lu";

export default async function AdicionarRemessaPage({
  searchParams,
  params,
}: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
  params: Promise<{ handler: string | undefined; estoque: string | undefined }>;
}) {
  const { code, method } = (await searchParams) as { [key: string]: string };
  const { estoque } = await params;
  if (!estoque) {
    return (
      <main className={styles.homepage}>
        <p>Estoque não informado.</p>
      </main>
    );
  }

  const session = await auth();
  const token = session?.user.access_token;

  const entidadeRepository = await EntidadeRepository.create();
  const produtos = await entidadeRepository.getListaProdutos();

  const estoqueRepository = await EstoqueRepository.create();
  const itens = await estoqueRepository.getEstoqueItens({ id: estoque });

  const isMethodByItem = method === "0";

  return (
    <main className={styles.homepage}>
      <div className={styles.header_section}>
        <h1>
          <LuLayers /> Adicionar itens
        </h1>
        <p>Insira uma nova remessa de produtos ao estoque.</p>
      </div>

      <div className="ghost_traco" />

      {isMethodByItem ? (
        <FormByItemProduto idRemessa={estoque} produtos={produtos ?? []} />
      ) : (
        <AddByFile sessionToken={token!} idEstoque={estoque} code={code!} />
      )}

      {isMethodByItem && itens && itens.length > 0 && (
        <div className={styles.item_list}>
          {itens.map((item) => (
            <ItemArmazenado
              key={item.id}
              item={item}
              tipo="GERENCIAVEL"
              token={token}
            />
          ))}
        </div>
      )}

      <Link
        href={`/resumo/${estoque}${
          code ? `?code=${encodeURIComponent(code)}` : ""
        }`}
        target="_parent"
      >
        Próximo
      </Link>
    </main>
  );
}
