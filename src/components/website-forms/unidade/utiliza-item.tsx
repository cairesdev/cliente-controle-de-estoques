import { Button } from "@/components/UI/button";
import stylesForm from "@/styles/components/forms.module.css";
import { useRouter } from "next/navigation";
import { updateItemUtilizado } from "./action";
import { toast } from "react-toastify";

export default function UtilizaItemForm({
  idProduto,
  qnt_disponivel,
}: {
  qnt_disponivel: number;
  idProduto: string;
}) {
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const data = {
      QNT_SOLICITADA: form.get("QNT_SOLICITADA"),
      PRODUTO: idProduto,
    };

    const isAdd = await updateItemUtilizado(data);

    if (isAdd) {
      router.refresh();
      toast.success("Saldo atualizado");
    } else {
      toast.warn("Tente novamente mais tarde");
    }
  };

  return (
    <form className={stylesForm.formulario_interno} onSubmit={handleSubmit}>
      <div className={stylesForm.input_container}>
        <label>Quantidade utilizada</label>
        <input
          type="number"
          name="QNT_SOLICITADA"
          placeholder="Quantidade utilizada"
          required
          min={0}
          max={qnt_disponivel}
        />
      </div>
      <Button rounded htmlType="submit">
        Confirmar
      </Button>
    </form>
  );
}
