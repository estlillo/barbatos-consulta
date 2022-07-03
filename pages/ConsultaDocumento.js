import { Card, Typography, Box, Divider, Alert } from "@mui/material";
import React, { useRef } from "react";

import styles from "../styles/Home.module.css";
import Footer from "./Components/footer/Footer";
import Header from "./Components/Header";
import ButtonConsulta from "./Components/ButtonConsulta";
import ContentLoader, { BulletList } from "react-content-loader";

import InputTextBusqueda from "./Components/InputTextBusqueda";
import DocumentoContent from "./Components/DocumentoContent";
import LinkVolver from "./Components/LinkVolver";
import Image from "next/image";
import ReCAPTCHA from "react-google-recaptcha";

export default function Consulta() {
  const [codigoBarra, setCodigoBarra] = React.useState("");
  const [resultado, setResultado] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const [captchaValido, setCaptchaValido] = React.useState(false);
  const captcha = useRef(null);

  const onChangeCaptcha = () => {
    if (captcha.current.getValue()) {
      setCaptchaValido(true);
    } else {
      setCaptchaValido(false);
    }
  };

  const onChangeHandler = (event) => {
    setCodigoBarra(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (captchaValido == true) {
      setError(null);
      setIsLoading(true);
      setResultado([]);
      fetch("/api/buscarDocumento", {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(codigoBarra),
      })
        .then((res) => res.json())
        .then((resultado) => {
          setResultado(resultado);
          setIsLoading(false);
        });
    } else {
      setError("Por favor, verifica que has leido el captcha");
    }
  };

  return (
    <div className={styles.container}>
      <Header />
      <LinkVolver redirect="/" mensaje="&larr; Volver al inicio" />

      <main className={styles.main}>
        <h1 className={styles.title}>Verificación de documentos</h1>

        <Typography variant="h6" component="h6">
          Escribe el <strong>código de barra</strong> que aparece en el pie del
          documento, como se indica a continuación
        </Typography>

        <Card className={styles.grid}>
          <Box className={styles.element}>
            <div>
              <span className={styles.logo}>
                <Image
                  src="/image_barcode.svg"
                  alt="Barbatos Logo"
                  width={180}
                  height={180}
                />
              </span>
            </div>
          </Box>
          <Box
            sx={{ display: "flex", flexDirection: "column", padding: "1rem" }}
          >
            <form onSubmit={handleSubmit}>
              {error && <Alert severity="error">{error}</Alert>}
              <InputTextBusqueda
                onChangeHandler={onChangeHandler}
                value={codigoBarra}
                id="codigoBarra"
                label="Código de barra"
              />
              <div>
                <ReCAPTCHA
                  ref={captcha}
                  sitekey="6LfMPKogAAAAAIjLBopJVaz1tVQ68XO1_pT_0AVC"
                  onChange={onChangeCaptcha}
                />
              </div>

              <ButtonConsulta isLoading={isLoading} />
            </form>
          </Box>
        </Card>
        {isLoading && <ContentLoader />}
        {resultado && resultado.documento && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <DocumentoContent documento={resultado.documento} />
          </Box>
        )}
      </main>
      <Footer />
    </div>
  );
}
