import { User } from "next-auth";
import { MODULO } from "@/constants/type-guard";
import { EntidadeRepository } from "@/services/getters/entidade";
import AlimentacaoHomePage from "./alimentacao.home";
import GaragemHomePage from "./garagem.home";
import { redirect } from "next/navigation";

export default async function UnidadeHomepage({
  search,
  user,
  handler,
}: {
  search: string;
  user: User;
  handler?: string;
}) {
  const entidadeRepository = await EntidadeRepository.create();
  const unidade = await entidadeRepository.getUnidade({
    id: handler as string,
  });

  switch (unidade?.id_tipo_unidade) {
    case MODULO.ESCOLAR:
      return (
        <AlimentacaoHomePage search={search} user={user} handler={handler} />
      );
    case MODULO.VEICULAR:
      return <GaragemHomePage handler={handler!} />;

    default:
      redirect("/log-in");
  }
}
