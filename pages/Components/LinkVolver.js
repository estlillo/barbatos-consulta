import React from 'react'
import Link from "next/link";
import styles from "@/styles/Home.module.css";

export default function LinkVolver({redirect, mensaje}) {
  if(!redirect) redirect = "/";
  if(!mensaje) mensaje = "&larr; Volver al inicio";
  return (
    <Link href={redirect}>
        <a className={styles.Button}>
          <h2>{mensaje}</h2>
        </a>
    </Link>
  )
}
