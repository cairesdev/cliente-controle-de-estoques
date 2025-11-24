"use client";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { HiOutlineSearch } from "react-icons/hi";
import styles from "@/styles/components/search.module.css";
import { BiSearch } from "react-icons/bi";
import { createUrl } from "@/utils";

export default function SearchInput({}: { path?: string; base?: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const val = e.target as HTMLFormElement;
    const search = val.search as HTMLInputElement;
    const newParams = new URLSearchParams(searchParams.toString());

    if (search.value) {
      newParams.set("q", search.value);
    } else {
      newParams.delete("q");
    }
    router.push(createUrl(pathname, newParams));
  }

  return (
    <form className={styles.pesquisar_container} onSubmit={onSubmit}>
      <div className={styles.input_wrapper}>
        <BiSearch className={styles.search_icon} />
        <input
          key={searchParams?.get("q")}
          type="search"
          name="search"
          title="Presione Enter para aplicar"
          placeholder="Digite e pressione Enter para filtrar"
          autoComplete="off"
          defaultValue={searchParams?.get("q") || ""}
          className={styles.input_field}
        />
      </div>
    </form>
  );
}

export function SearchSkeleton() {
  return (
    <form className={styles.pesquisar_container}>
      <span className={styles.search_icon}>
        <HiOutlineSearch
          size={24}
          color="#424242"
          className={styles.search_icon}
        />
      </span>
      <input placeholder="Pesquisar" className={styles.input_field} />
    </form>
  );
}
