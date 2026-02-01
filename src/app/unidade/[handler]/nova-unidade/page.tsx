import FormUnidade from "@/components/website-forms/unidade/add-unidade";
import { EntidadeRepository } from "@/services/getters/entidade";
import styles from "@/styles/homepage.module.css";
import { TbHomePlus } from "react-icons/tb";

export default async function NovaUnidadePage({
  params,
}: {
  params: Promise<{ handler: string | undefined }>;
}) {
  const { handler } = await params;

  const entidadeRepository = await EntidadeRepository.create();
  const unidade = await entidadeRepository.getListaTipoUnidade();

  const modulos = await entidadeRepository.getModulosDisponiveis({
    id: handler as string,
  });

  type Modulos = {
    escolar: number;
    saude: number;
    combustivel: number;
  };

  const mapaModulos: Record<number, keyof Modulos> = {
    1: "escolar",
    99: "saude",
    255: "combustivel",
  };

  const modulosLiberados = unidade!.filter((item) => {
    const chave = mapaModulos[parseInt(item.id)];
    return chave && modulos![chave] === 1;
  });

  return (
    <main className={styles.homepage}>
      <div className={styles.header_section}>
        <h1>
          <TbHomePlus /> Cadastro de unidade
        </h1>
        <p>Adicione uma nova unidade gerenciavel.</p>
      </div>
      <div className="ghost_traco" />
      <FormUnidade tiposUnidade={modulosLiberados!} idEntidade={handler!} />
    </main>
  );
}
