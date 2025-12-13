"use client";
import styles from "@/styles/components/forms.module.css";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { useState } from "react";
import { Button } from "@/components/UI/button";
import { enviarArquivoEstoque } from "./action-cliente";
import { useRouter } from "next/navigation";

export default function AddByFile({
  idEstoque,
  sessionToken,
  code,
}: {
  idEstoque: string;
  sessionToken: string;
  code: string;
}) {
  const [file, setFile] = useState<File | null>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const resetFile = async () => setFile(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!file) return alert("Selecione um arquivo antes de enviar.");

    const formData = new FormData();
    formData.append("ARQUIVO", file);
    formData.append("ESTOQUE", idEstoque);
    formData.append("CODIGO", code);

    await enviarArquivoEstoque(formData, sessionToken);
  };
  const router = useRouter();
  return (
    <form className={styles.formulario_interno} onSubmit={handleSubmit}>
      {!file ? (
        <div className={styles.uploadBox}>
          <input
            type="file"
            name="ARQUIVO"
            id="fileUpload"
            accept=".xlsx"
            onChange={handleFile}
            required
          />

          <label htmlFor="fileUpload" className={styles.uploadContent}>
            <AiOutlineCloudUpload size={42} strokeWidth={1.8} />
            <p>Selecione o arquivo desejado</p>
          </label>
        </div>
      ) : (
        <div className={styles.fileSelected}>
          <div>
            <span>{file.name}</span>
          </div>

          <label htmlFor="fileUpload" className={styles.changeBtn}>
            Trocar arquivo
            <input
              type="file"
              id="fileUpload"
              name="ARQUIVO"
              onChange={handleFile}
            />
          </label>

          <button
            type="button"
            onClick={resetFile}
            className={styles.removeBtn}
          >
            Remover
          </button>
        </div>
      )}

      <span className="error_message">
        Certifique-se de estar utilizando o template.
      </span>
      <Button htmlType="submit" rounded>
        Enviar
      </Button>
      <Button rounded type="alternative" onClick={() => router.back()}>
        Voltar
      </Button>
    </form>
  );
}
