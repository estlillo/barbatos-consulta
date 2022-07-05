import {
  Typography,
  Box,
  Divider,
  IconButton,
  Stack,
  TextField,
  Alert,
} from "@mui/material";
import React, { useEffect } from "react";
import ContentLoader from "react-content-loader";
import { useForm } from "react-hook-form";
import LaunchIcon from "@mui/icons-material/Launch";
import { useRouter } from "next/router";

import styles from "@/styles/Home.module.css";
import ButtonConsulta from "@/components/ButtonConsulta";
import DocumentoContent from "@/components/DocumentoContent";
import DialogObservacion from "@/components/DialogObservacion";
import useConsultaExpediente from "@/customHooks/useConsultaExpediente";

export default function Consulta() {
  const [habilitado, setHabilitado] = React.useState(false);
  const [numeroExpediente, setNumeroExpediente] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [observaciones, setObservaciones] = React.useState([]);
  const [isLoading, resultado, error] = useConsultaExpediente(numeroExpediente);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    setNumeroExpediente(data.numeroExpediente);
  };

  //modal observaciones
  const handleClickOpen = (observaciones) => {
    setObservaciones(observaciones);
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason && reason === "backdropClick") return;
    setOpen(false);
  };

  if (!habilitado) {
    const router = useRouter();
    useEffect(() => {
      router.push("/not-found");
    }, []);

    return <></>;
  } else {
    return (
      <>
        <h1 className={styles.title}>Servicio de consulta expediente</h1>

        <Typography variant="h6" component="h6">
          Escribe el número de expediente
        </Typography>

        <Box className={styles.element}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box sx={{ mt: 1, display: "flex", flexDirection: "column" }}>
              <TextField
                {...register("numeroExpediente", {
                  required: "Campo requerido",
                })}
                margin="normal"
                label="Número de expediente"
                variant="standard"
                error={errors?.numeroExpediente?.message.length > 0}
                helperText={errors?.numeroExpediente?.message}
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
      </>
    );
  }
}
