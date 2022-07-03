import React from "react";

import styles from "@/styles/Home.module.css";
import Header from "@/components/Header";
import Footer from "@/components/footer/Footer";
import CardServicio from "@/components/CardServicio";

export default function Home() {
  const [servicios, SetServicios] = React.useState([]);

  React.useEffect(() => {
    fetch("/api/servicios")
      .then((res) => res.json())
      .then((resultado) => {
        SetServicios(resultado);
      }
      );
  }
  , []);

  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
        <h1 className={styles.title}>
          Bienvenido a <a href="#">ExeConsulta</a>
        </h1>

        <p className={styles.description}>
          Una extensión para tu gestor documental <strong>ExeDOC</strong>,
          empieza por hacer clic en uno de los servicios que provee{" "}
          <strong>ExeConsulta</strong>{" "}
        </p>
        <div className={styles.grid}>
          {servicios.map((servicio, index) => (
            <CardServicio
              key={index}
              title={servicio.title}
              description={servicio.description}
              urlServicio={servicio.urlRedirect}
              active={servicio.active}
            />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
