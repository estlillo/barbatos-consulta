import React from "react";
import Header from "@/layout/Header";
import Footer from "@/layout/footer/Footer";
import styles from "@/styles/Home.module.css";
import LinkVolver from "@/components/LinkVolver";
import NavBar from "@/layout/NavBar";


export default function Layout({ children }) {
  return (
    <>
      <Header />
     {/* <NavBar /> */}
     
      <div className={styles.container}>
      <LinkVolver redirect="/" mensaje="Inicio" />
        <main className={styles.main}>{children}</main>
        <Footer />
      </div>
    </>
  );
}
