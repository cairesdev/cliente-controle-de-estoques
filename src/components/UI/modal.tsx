"use client";
import { useRouter } from "next/navigation";
import styles from "@/styles/modal.module.css";
import { FaListUl } from "react-icons/fa";
import { IoMdCloseCircleOutline } from "react-icons/io";

export function ModalComponent({
  children,
  label = "Modulo",
}: {
  children: React.ReactNode;
  label?: string;
}) {
  const router = useRouter();

  return (
    <section className={styles.modal_base}>
      <div className={styles.separador}>
        <div className={styles.header_modal}>
          <FaListUl color="#48a7f8" className="icon" />
          <h2>{label}</h2>
          <button onClick={() => router.back()}>
            <IoMdCloseCircleOutline />
          </button>
        </div>

        <div className={styles.modal_children}>{children}</div>
      </div>
    </section>
  );
}
