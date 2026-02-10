import Image from "next/image";
import styles from "@/styles/print/comprovante-print.module.css";
import { EstoqueRepository } from "@/services/getters/estoque";
import { transformData } from "@/utils";
import { EntidadeRepository } from "@/services/getters/entidade";
import { auth } from "@/auth";
import { GoToHomeButton, PrintPageButton } from "@/components/action-buttons";

export default async function ComprovantePrintPage({
  params,
  searchParams,
}: {
  params: Promise<{ handler: string }>;
  searchParams?: Promise<{ [key: string]: string }>;
}) {
  const { handler } = await params;
  const { code } = (await searchParams) as { code: string };

  const estoqueRepository = await EstoqueRepository.create();
  const data = await estoqueRepository.getComprovante({
    id: handler,
    comprovante: code,
  });
  const entidadeRepository = await EntidadeRepository.create();

  const unidade = await entidadeRepository.getUnidade({
    id: data?.estoque.unidade!,
  });

  return (
    <main className={styles.page}>
      {/* CABEÇALHO */}
      <h1>{data?.estoque.orgao}</h1>
      <br />
      <header className={styles.header}>
        <div className={styles.topo}>
          <span className={styles.tituloDocumento}>Guia de Recebimento</span>
          <span className={styles.dataDocumento}>
            Data: {transformData(data?.estoque.data_entrada!)}
          </span>
        </div>
        <div className={styles.identificacaoEscola}>
          <div className={styles.identificacaoTitulo}>
            IDENTIFICAÇÃO DA ESCOLA
          </div>

          <div className={styles.identificacaoConteudo}>
            {/* Dados */}
            <div className={styles.tabelaInfo}>
              <div className={styles.linhaInfo}>
                <span className={styles.rotulo}>NOME / ENTIDADE</span>
                <span className={styles.valor} style={{ gridColumn: "span 5" }}>
                  {unidade?.nome}
                </span>
              </div>

              <div className={styles.linhaInfo}>
                <span className={styles.rotulo}>LOCALIDADE</span>
                <span className={styles.valor} style={{ gridColumn: "span 5" }}>
                  {unidade?.endereco}
                </span>
              </div>

              <div className={styles.linhaInfo}>
                <span className={styles.rotulo}>BAIRRO</span>
                <span className={styles.valor}>{unidade?.bairro}</span>
                <span className={styles.rotulo}>MUNICÍPIO</span>
                <span className={styles.valor}>{data?.estoque.cidade}</span>
                <span className={styles.rotulo}>UF</span>
                <span className={styles.valor}>MA</span>
              </div>
            </div>

            {/* QR Code */}
            <div className={styles.qrBox}>
              <span className={styles.qrTitulo}>AUTENTICAÇÃO</span>
              {/* <Image
                src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${data?.estoque.codigo}:comprovante`}
                alt="QR Code"
                width={110}
                height={110}
              /> */}
              Código: {data?.estoque.codigo}
            </div>
          </div>
        </div>
      </header>
      {/* TABELA DE PRODUTOS */}
      <table className={styles.tabelaProdutos}>
        <thead>
          <tr>
            <th>Produto</th>
            <th>Qtd. Liberada</th>
            <th>Validade</th>
            <th>Codigo / Origem</th>
          </tr>
        </thead>
        <tbody>
          {data?.itens.map((item) => (
            <tr key={item.id}>
              <td>{item.nome}</td>
              <td>
                {item.qnt_entrada} {item.und_medida}
              </td>
              <td>{transformData(item.data_validade)}</td>
              <td>
                {item.origem?.codigo} – {item.origem?.nome}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* ASSINATURAS */}
      <br />
      <br />
      <div>
        <p>Solicitante: {data?.estoque.solicitante}</p>
        <p>Despachante: {data?.estoque.despachante}</p>
      </div>
      <br />
      <br />
      <footer className={styles.footer}>
        <div>
          <p>____________________________________</p>
          <p>Entregador</p>
        </div>
        <div>
          <p>____________________________________</p>
          <p>Recebedor</p>
        </div>
      </footer>
      <p className={styles.observacao}>
        Obs.: Os gêneros alimentícios encontram-se em condições de consumo,
        conforme prazo de validade.
      </p>
      <br />
      <br />
      <p>Impresso em: {new Date().toLocaleDateString("pt-br")}</p>
      <br />
      <PrintPageButton /> <GoToHomeButton />
    </main>
  );
}
