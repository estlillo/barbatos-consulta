import axios from "axios";
import {
  Typography,
  Box,
  Divider,
  IconButton,
  Stack,
} from "@mui/material";
import React from "react";
import ContentLoader, { BulletList } from "react-content-loader";
import styles from "../styles/Home.module.css";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import ButtonConsulta from "./Components/ButtonConsulta";

import InputTextBusqueda from "./Components/InputTextBusqueda";
import DocumentoContent from "./Components/DocumentoContent";
import LinkVolver from "./Components/LinkVolver";
import LaunchIcon from "@mui/icons-material/Launch";

import DialogObservacion from "./Components/DialogObservacion";
export default function Consulta() {
  const [numeroExpediente, setNumeroExpediente] = React.useState([""]);
  const [resultado, setResultado] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  const [open, setOpen] = React.useState(false);
  const [observaciones, setObservaciones] = React.useState([]);

  const handleClickOpen = (observaciones) => {
    setObservaciones(observaciones);
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason && reason === "backdropClick") return;
    setOpen(false);
  };

  const onChangeHandler = (event) => {
    setNumeroExpediente(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setResultado([]);
    setIsLoading(true);
    axios
      .post("/api/buscarExpediente", {
        numeroExpediente: numeroExpediente,
      })
      .then((response) => {
        setResultado(response.data);
        setIsLoading(false);
      });
  };

  return (
    <div className={styles.container}>
      <Header />
      <LinkVolver redirect="/" mensaje="&larr; Volver al inicio" />

      <main className={styles.main}>
        <h1 className={styles.title}>Servicio de consulta expediente</h1>

        <Typography variant="h6" component="h6">
          Escribe el número de expediente
        </Typography>

        <Box className={styles.element}>
          <form onSubmit={handleSubmit}>
            <Box sx={{ mt: 1, display: "flex", flexDirection: "column" }}>
              <InputTextBusqueda
                required={true}
                onChangeHandler={onChangeHandler}
                value={numeroExpediente}
                id="numeroExpedediente"
                label="Número expediente"
              />
              <ButtonConsulta isLoading={isLoading} />
            </Box>
          </form>
        </Box>

        {isLoading && <ContentLoader />}

        {resultado && resultado.documentos && (
          <div>
            <br></br>
            <Divider />
            <br></br>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography variant="h5" component="h2">
                <strong>Expediente</strong> {resultado.numeroExpediente}
              </Typography>
              <Stack direction="row" spacing={1} alignItems="center">
                <Typography variant="body2" component="p">
                  <strong>Documentos</strong> {resultado.cantidadDocumentos}
                </Typography>

                <Divider orientation="vertical" />

                <Typography variant="body2" component="p">
                  <strong>Observaciones</strong>{" "}
                  {resultado.cantidadObservaciones}
                  <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="span"
                    onClick={() => handleClickOpen(resultado.observaciones)}
                  >
                    <LaunchIcon />
                  </IconButton>
                </Typography>
              </Stack>

              {resultado?.documentos?.map((documento, index) => (
                <DocumentoContent documento={documento} key={index} />
              ))}
            </Box>
          </div>
        )}

        <DialogObservacion
          open={open}
          setOpen={setOpen}
          onClose={handleClose}
          notifyError={null}
          observaciones={observaciones}
          numeroExpediente={numeroExpediente}
        />
      </main>
      <Footer />
    </div>
  );
}
