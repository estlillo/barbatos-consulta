import React from "react";
import styles from "@/styles/Home.module.css";
import {
  Box,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import useFetch from "@/customHooks/useFetch";

export default function Inyectar() {
  const [tipoDocumento, setTipoDocumento] = React.useState("");
  const [formatoDocumento, setFormatoDocumento] = React.useState("");
  const [procesoDocumento, setProcesoDocumento] = React.useState("");
  const [labelProceso, setLabelProceso] = React.useState(
    "Documento con proceso"
  );
  const [isProceso, setIsProceso] = React.useState(false);
  const {data: tiposDocumento, loading: loadingTd,error: errorTd} = useFetch('/api/servicios/tiposDocumento');
  const {data: formatosDocumento, loading: loadingFd,error: errorFd} = useFetch('/api/servicios/formatosDocumento');
  const {data: procesosDocumento, loading: loadingPd,error: errorPd} = useFetch('/api/servicios/procesosDocumento');

  const handleChange = (event) => {
    setTipoDocumento(event.target.value);

    console.log(tipoDocumento);
  };

  const handleChangeProceso = (event) => {
    setProcesoDocumento(event.target.value);

    console.log(tipoDocumento);
  };

  const handleChangeFormato = (event) => {
    setFormatoDocumento(event.target.value);
  };

  const handleChangeIsProceso = (event) => {
    setIsProceso(event.target.checked);
    if (event.target.checked) {
      setLabelProceso("Documento con proceso");
    } else {
      setLabelProceso("Documento sin proceso");
    }
  };

  return (
    <>
      <h1 className={styles.title}>Inyección de documentos</h1>
      <Typography variant="h6" component="h6">
        Aquí podrás realizar inyección de todo tipo de documentos al gestor
        documental
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          padding: "1rem",
          width: "80%",
        }}
      >
        <Grid container spacing={1}>
          <Grid item xs={12} md={12}>
            <FormControlLabel
              margin="normal"
              control={
                <Switch checked={isProceso} onChange={handleChangeIsProceso} />
              }
              label={labelProceso}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <FormControl fullWidth margin="normal">
              <InputLabel id="demo-simple-select-label">
                Proceso de documento
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={procesoDocumento}
                label="Proceso de documento"
                onChange={handleChangeProceso}
                disabled={!isProceso}
              >
                 {procesosDocumento && procesosDocumento.map((pd, index) => (
                  <MenuItem key={index} value={pd.id}>{pd.description}</MenuItem>
                ))}
              </Select>
              <FormHelperText>Seleccione el tipo de documento</FormHelperText>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={4}>
            <FormControl fullWidth margin="normal">
              <InputLabel id="demo-simple-select-label">
                Tipo de documento
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={tipoDocumento}
                label="Tipo de documento"
                onChange={handleChange}
              >
                {tiposDocumento && tiposDocumento.map((td, index) => (
                  <MenuItem key={index} value={td.id}>{td.description}</MenuItem>
                ))}
              </Select>
              <FormHelperText>Seleccione el tipo de documento</FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl fullWidth margin="normal">
              <InputLabel id="demo-simple-select-label">
                Formato de documento
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={formatoDocumento}
                label="Formato de docum7ento"
                onChange={handleChangeFormato}
              >
               {formatosDocumento && formatosDocumento.map((fd, index) => (
                  <MenuItem key={index} value={fd.id}>{fd.description}</MenuItem>
                ))}
              </Select>
              <FormHelperText>
                Seleccione el formato de documento
              </FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Materia"
              variant="outlined"
              margin="normal"
              fullWidth
              multiline
              rows={4}
              helperText="Escribe el código de barra que aparece en el pie del documento"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Antecedentes"
              variant="outlined"
              margin="normal"
              fullWidth
              multiline
              rows={4}
              helperText="Escribe el código de barra que aparece en el pie del documento"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Antecedentes"
              variant="outlined"
              margin="normal"
              fullWidth
              multiline
              rows={4}
              helperText="Escribe el código de barra que aparece en el pie del documento"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Antecedentes"
              variant="outlined"
              margin="normal"
              fullWidth
              multiline
              rows={4}
              helperText="Escribe el código de barra que aparece en el pie del documento"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Antecedentes"
              variant="outlined"
              margin="normal"
              fullWidth
              multiline
              rows={4}
              helperText="Escribe el código de barra que aparece en el pie del documento"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Antecedentes"
              variant="outlined"
              margin="normal"
              fullWidth
              multiline
              rows={4}
              helperText="Escribe el código de barra que aparece en el pie del documento"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Antecedentes"
              variant="outlined"
              margin="normal"
              fullWidth
              multiline
              rows={4}
              helperText="Escribe el código de barra que aparece en el pie del documento"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Antecedentes"
              variant="outlined"
              margin="normal"
              fullWidth
              multiline
              rows={4}
              helperText="Escribe el código de barra que aparece en el pie del documento"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Antecedentes"
              variant="outlined"
              margin="normal"
              fullWidth
              multiline
              rows={4}
              helperText="Escribe el código de barra que aparece en el pie del documento"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Antecedentes"
              variant="outlined"
              margin="normal"
              fullWidth
              multiline
              rows={4}
              helperText="Escribe el código de barra que aparece en el pie del documento"
            />
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
