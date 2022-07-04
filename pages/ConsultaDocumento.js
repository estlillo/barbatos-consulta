import { Card, Typography, Box, Alert, TextField } from "@mui/material";
import React, { useRef } from "react";
import ContentLoader from "react-content-loader";
import Image from "next/image";
import ReCAPTCHA from "react-google-recaptcha";
import { useForm } from "react-hook-form";

import styles from "@/styles/Home.module.css";
import ButtonConsulta from "@/components/ButtonConsulta";
import DocumentoContent from "@/components/DocumentoContent";
import useConsultaDocumento from "@/customHooks/useConsultaDocumento";

export default function Consulta() {
  const [codigoBarra, setCodigoBarra] = React.useState("");
  const [errorCaptcha, setErrorCaptcha] = React.useState("");
  const [captchaValido, setCaptchaValido] = React.useState(true);

  const [isLoading, resultado, error] = useConsultaDocumento(codigoBarra);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const captcha = useRef(null);

  const onChangeCaptcha = () => {
    if (captcha.current.getValue()) {
      setCaptchaValido(true);
    } else {
      setCaptchaValido(false);
    }
  };

  const onSubmit = (data) => {
    if (captchaValido == true) {
      setErrorCaptcha(null);
      setCodigoBarra(data.codigoBarra);
    } else {
      setErrorCaptcha("Por favor, verifica que has leido el captcha");
    }
  };

  return (
    <>
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
        <Box sx={{ display: "flex", flexDirection: "column", padding: "1rem" }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            {errorCaptcha && <Alert severity="error">{errorCaptcha}</Alert>}
            <TextField
              {...register("codigoBarra", { required: "Campo requerido" })}
              margin="normal"
              fullWidth
              label="Código de barra"
              variant="standard"
              error={errors?.codigoBarra?.message.length > 0}
              helperText={errors?.codigoBarra?.message}
            />
           

            <ButtonConsulta isLoading={isLoading} />
          </form>
        </Box>
      </Card>

      {isLoading && <ContentLoader />}

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "1rem",
        }}
      >
        {resultado &&
          resultado.errores &&
          resultado.errores.length > 0 &&
          resultado.errores.map((error, index) => (
            <Alert severity="error" key={index}>
              {error}
            </Alert>
          ))}

        {resultado && resultado.documento && (
          <DocumentoContent documento={resultado.documento} />
        )}
      </Box>
    </>
  );
}
