import {
  Typography,
  Box,
} from "@mui/material";
import React from "react";
import ContentLoader, { BulletList } from 'react-content-loader'
import styles from "../styles/Home.module.css";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import ButtonConsulta from "./Components/ButtonConsulta";
import { DataGrid } from '@mui/x-data-grid';
import InputTextBusqueda from "./Components/InputTextBusqueda";
import LinkVolver from "./Components/LinkVolver";

export default function Consulta() {
  const [usuario, setUsuario] = React.useState("");
  const [data, setData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  const columns = [
    { field: 'fecha', headerName: 'FECHA', width: 300 },
    { field: 'tipoAccion', headerName: 'TIPO ACCIÓN', width: 300 },
    { field: 'username', headerName: 'USUARIO', width: 300 },
    { field: 'nodo', headerName: 'NODO', width: 300 },
    { field: 'detalle', headerName: 'DETALLE', width: 600 },
  ]

  const onChangeHandler = (event) => {
    setUsuario(event.target.value);
  };

  //create handleSubmit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setData([]);
    setIsLoading(true);
    fetch("/api/buscarHistorial", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(usuario),
    }).then((res) => res.json())
      .then((data) => {
        setData(data);
        setIsLoading(false);
      });
  };

  return (
    <div className={styles.container}>
      <Header />
      <LinkVolver
        redirect="/"
        mensaje="&larr; Volver al inicio"
      />

      <main className={styles.main}>
        <h1 className={styles.title}>Servicio de consulta historial acciones de usuario</h1>

        <Typography variant="h6" component="h6">
          Escribe un nombre de usuario (opcional)
        </Typography>

        <form onSubmit={handleSubmit}>
          <Box sx={{ mt: 1, display: "flex", flexDirection: "column" }}>
            <InputTextBusqueda
              onChangeHandler={onChangeHandler}
              value={usuario}
              id="usuario"
              label="Nombre de usuario"
            />
            <ButtonConsulta isLoading={isLoading} />
          </Box>
        </form>
        {isLoading && <BulletList />}

        {data && data.length > 0 && (
          <div style={{ height: 700, width: '100%' }}>
            <DataGrid
              columns={columns}
              rows={data}
              pageSize={50}
            />
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
