import { auth } from "@/auth";
import SessionExpiration from "@/components/session-expiration";
import { DESCRICAO_NIVEIS } from "@/constants/enums";

export default async function Home() {
  const session = await auth();
  return (
    <main>
      {/* <SessionExpiration /> */}
      <p>
        {session?.user.nome} - {session?.user.descricao}
      </p>
    </main>
  );
}
