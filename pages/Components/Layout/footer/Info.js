import Image from "next/image";
import React from "react";
import styles from "@/styles/Home.module.css";

export default function Info() {
  return (
    <>
      <a
        href="https://www.instagram.com/estnomore"
        target="_blank"
        rel="noopener noreferrer"
      >
        BarbatosDev 2022{" "}
        <span className={styles.logo}>
          <Image src="/logo.png" alt="Barbatos Logo" width={20} height={20} />
        </span>
      </a>
    </>
  );
}
