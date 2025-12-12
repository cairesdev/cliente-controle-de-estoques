import { auth } from "@/auth";
import { GoToHomeButton, PrintPageButton } from "@/components/action-buttons";
import ItemArmazenado from "@/components/UI/item-estoque";
import { TipoVisualizacao } from "@/constants/type-guard";
import { EstoqueRepository } from "@/services/getters/estoque";
import styles from "@/styles/homepage.module.css";
import Image from "next/image";
import { LuLayers } from "react-icons/lu";

export default async function ResumoEstoquePage({
  params,
  searchParams,
}: {
  params: Promise<{ handler: string | undefined }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { handler } = await params;
  const session = await auth();
  const { tipo } = (await searchParams) as {
    [key: string]: string;
  };

  const estoqueRepository = await EstoqueRepository.create();
  const data = await estoqueRepository.getResumoEstoqueEntidade({
    id: handler!,
  });

  return (
    <main className={styles.homepage}>
      <div className={styles.header_section}>
        <h1>
          <LuLayers />
          {parseInt(tipo) === TipoVisualizacao.EDITAR
            ? " Resumo das adições"
            : "Visualizar detalhes"}
        </h1>
        <div className="ghost_traco" />
      </div>
      <div className={styles.barcode_container}>
        <h2>Código: {data?.remessa.codigo}</h2>
        <Image
          src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${data?.remessa.codigo}`}
          alt="barcode"
          width={190}
          height={190}
          loading="eager"
        />
      </div>
      <p>Quantidade cadastrada: {data?.remessa.qnt_registrada}</p>
      <div>
        {data?.itens.map((item) => (
          <ItemArmazenado
            key={item.id}
            item={item}
            tipo={
              parseInt(tipo) === TipoVisualizacao.EDITAR
                ? "GERENCIAVEL"
                : "SIMPLES"
            }
            token={session?.user.access_token}
          />
        ))}
      </div>
      <PrintPageButton />
      <GoToHomeButton />
    </main>
  );
}
