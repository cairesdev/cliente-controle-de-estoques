import Image from "next/image";
import { auth } from "@/auth";
import { EstoqueRepository } from "@/services/getters/estoque";
import { EntidadeRepository } from "@/services/getters/entidade";
import { transformData } from "@/utils";
import styles from "@/styles/print/compovante_estoque.module.css";
import { notFound } from "next/navigation";
import { GoToHomeButton, PrintPageButton } from "@/components/action-buttons";

export default async function ResumoEstoquePrintPage({
  params,
  searchParams,
}: {
  params: Promise<{ handler: string }>;
  searchParams?: Promise<{ code: string }>;
}) {
  const session = await auth();
  const { handler } = await params;
  const { code } = (await searchParams) as { code: string };

  const estoqueRepository = await EstoqueRepository.create();
  const data = await estoqueRepository.getResumoEstoqueEntidade({
    id: handler,
  });

  if (!data?.remessa) return notFound();

  const entidadeRepository = await EntidadeRepository.create();
  const entidade = await entidadeRepository.getEntidade({
    id: session?.user.entidade_id!,
  });

  return (
    <main className={styles.page}>
      {/* CABEÇALHO */}
      <header className={styles.header}>
        <div className={styles.headerGrid}>
          {/* TEXTO */}
          <div>
            <div className={styles.topo}>
              <span className={styles.tituloDocumento}>Guia de Estoque</span>
              <span className={styles.dataDocumento}>
                Data: {transformData(data.remessa.data_entrada!)}
              </span>
            </div>

            <div className={styles.identificacaoEscola}>
              <div className={styles.identificacaoTitulo}>
                IDENTIFICAÇÃO: {data.remessa.nome_estoque}
              </div>

              <div className={styles.tabelaIdentificacao}>
                <div className={styles.linha}>
                  <span className={styles.rotulo}>NOME / ENTIDADE</span>
                  <span className={styles.valor}>{entidade?.nome}</span>
                </div>

                <div className={styles.linha}>
                  <span className={styles.rotulo}>LOCALIDADE</span>
                  <span className={styles.valor}>{entidade?.endereco}</span>
                </div>

                <div className={styles.linha}>
                  <span className={styles.rotulo}>BAIRRO</span>
                  <span className={styles.valor}>{entidade?.bairro}</span>
                  <span className={styles.rotulo}>MUNICÍPIO</span>
                  <span className={styles.valor}>{entidade?.cidade}</span>
                  <span className={styles.rotulo}>UF</span>
                  <span className={styles.valor}>MA</span>
                </div>
              </div>
            </div>
          </div>

          {/* QR CODE */}
          <div className={styles.qrBox}>
            <Image
              src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${data.remessa.codigo}:entidade:${handler}`}
              alt="QR Code de autenticação"
              width={110}
              height={110}
            />
            <span className={styles.qrLabel}>
              Código: {data.remessa.codigo}
            </span>
          </div>
        </div>
      </header>
      {/* TABELA DE ITENS */}
      <table className={styles.tabela}>
        <thead>
          <tr>
            <th>{data.remessa.tipo_estoque}</th>
            <th>Quantidade</th>
            <th>Validade</th>
          </tr>
        </thead>
        <tbody>
          {data.itens.map((item) => (
            <tr key={item.id}>
              <td>{item.nome}</td>
              <td>
                {item.qnt_entrada} {item.und_medida}
              </td>
              <td>{transformData(item.data_validade)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* ASSINATURAS */}
      <footer className={styles.footer}>
        <div>
          <p>____________________________________</p>
          <p>Responsável pelo Almoxarifado</p>
        </div>
        <div>
          <p>Registrado pelo usuario</p>
          <p>{data.remessa.nome}</p>
        </div>
      </footer>
      <p className={styles.obs}>
        Obs.: Os gêneros alimentícios encontram-se em condições adequadas de
        consumo, conforme prazo de validade.
      </p>
      <br />
      <br />
      <p>Impresso em: {new Date().toLocaleDateString("pt-br")}</p>
      <br />
      <PrintPageButton /> <GoToHomeButton />
    </main>
  );
}
