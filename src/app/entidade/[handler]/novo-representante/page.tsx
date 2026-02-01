import { auth } from "@/auth";
import NovoRepresentante from "@/components/website-forms/entidade/adicionar-representante";
import { HttpStatus, TipoUsuario } from "@/constants/type-guard";
import { EntidadeRepository } from "@/services/getters/entidade";
import styles from "@/styles/homepage.module.css";
import { BsPersonPlusFill } from "react-icons/bs";

export default async function NovoRepresentantePage({
  params,
  searchParams,
}: {
  params: Promise<{ handler: string | undefined }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { handler } = await params;
  const { code } = (await searchParams) as {
    [key: string]: string;
  };
  const entidadeRepository = await EntidadeRepository.create();
  const unidades = await entidadeRepository.getUnidades({
    id: handler as string,
  });

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

  const session = await auth();
  const nivelLiberado = TipoUsuario.filter(
    (item) => item.id < parseInt(session?.user.nivel!),
  );

  return (
    <main className={styles.homepage}>
      <div className={styles.header_section}>
        <h1>
          <BsPersonPlusFill /> Novo Representante
        </h1>
        <p>Cadastre um usuario para exercer funções.</p>
      </div>
      <div className="ghost_traco" />
      {code && (
        <span className="error_message">
          {parseInt(code) === HttpStatus.NOT_ACEPTABLE && "Senhas não conferem"}
          {parseInt(code) === HttpStatus.CONFLICT && "Usuário indisponível"}
        </span>
      )}

      <NovoRepresentante
        niveisAutorizados={nivelLiberado!}
        entidade={handler!}
        unidades={unidades!}
        modulos={modulosLiberados!}
      />
    </main>
  );
}
