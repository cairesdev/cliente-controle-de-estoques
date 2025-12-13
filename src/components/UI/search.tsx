"use client";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { HiOutlineSearch } from "react-icons/hi";
import styles from "@/styles/components/search.module.css";
import { BiSearch } from "react-icons/bi";
import { useEffect, useState } from "react";

export default function SearchInput() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [value, setValue] = useState(searchParams.get("q") || "");

  useEffect(() => {
    const timeout = setTimeout(() => {
      const newParams = new URLSearchParams(searchParams.toString());

      if (value) {
        newParams.set("q", value);
      } else {
        newParams.delete("q");
      }

      router.push(`${pathname}?${newParams.toString()}`);
    }, 400);

    return () => clearTimeout(timeout);
  }, [value, pathname, router, searchParams]);

  return (
    <div className={styles.pesquisar_container}>
      <div className={styles.input_wrapper}>
        <BiSearch className={styles.search_icon} />
        <input
          type="search"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Digite para filtrar"
          autoComplete="off"
          className={styles.input_field}
        />
      </div>
    </div>
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
