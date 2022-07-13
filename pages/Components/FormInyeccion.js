import { FormControl, FormControlLabel, Grid, InputLabel, Switch, TextField } from "@mui/material";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import useObtenerData from "@/customHooks/useObtenerData";
import SelectForm from "@/components/SelectForm";
import TextFieldForm from "@/components/TextFieldForm";
import JoditText from "./JoditText";

export default function FormInyeccion() {
  const [labelProceso, setLabelProceso] = React.useState(
    "Documento sin proceso"
  );
  const [isProceso, setIsProceso] = React.useState(false);

  const [tiposDocumento, loadingTd, errorTd] = useObtenerData({
    url: "/api/servicios/tiposDocumento",
  });
  const [formatosDocumento, loadingFd, errorFd] = useObtenerData({
    url: "/api/servicios/formatosDocumento",
  });
  const [procesosDocumento, loadingPd, errorPd] = useObtenerData({
    url: "/api/servicios/procesosDocumento",
  });

  const handleChangeIsProceso = (event) => {
    setIsProceso(event.target.checked);
    if (event.target.checked) {
      setLabelProceso("Documento con proceso");
    } else {
      setLabelProceso("Documento sin proceso");
    }
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const sendToApi = (data) => {
    console.log(data);
  };

  return (
    <>
      <form onSubmit={handleSubmit(sendToApi)}>
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
            <SelectForm
              inputLabel="Proceso de documento"
              name="procesoDocumento"
              register={register}
              rules={{ required: "Campo Proceso de documento es obligatorio" }}
              options={procesosDocumento}
              helper="Seleccione el proceso si corresponde"
              disabled={!isProceso}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <SelectForm
              inputLabel="Tipo de documento"
              name="tipoDocumento"
              register={register}
              rules={{ required: "Campo Tipo de documento es obligatorio" }}
              errors={errors}
              options={tiposDocumento}
              helper="Seleccione el tipo de documento"
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <SelectForm
              inputLabel="Formato de documento"
              name="formatoDocumento"
              register={register}
              rules={{ required: "Campo Formato de documento es obligatorio" }}
              errors={errors}
              options={formatosDocumento}
              helper="Seleccione el formato de documento"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextFieldForm
              id="materia"
              name="materia"
              inputLabel="Materia"
              helper="Escribe la materia del documento"
              multiline
              rows={4}
              register={register}
              errors={errors}
              rules={{ required: "Campo materia es obligatorio" }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextFieldForm
              id="antecedentes"
              name="antecedentes"
              inputLabel="Antecedentes"
              helper="Escribe los antecedentes del documento"
              multiline
              rows={4}
              register={register}
              errors={errors}
              rules={{ required: "Campo antecedentes es obligatorio" }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
           
          </Grid>
          <Grid item xs={12} md={6}></Grid>
          <Grid item xs={12} md={6}></Grid>
          <Grid item xs={12} md={6}></Grid>
          <Grid item xs={12} md={6}></Grid>
          <Grid item xs={12} md={6}></Grid>
          <Grid item xs={12} md={6}></Grid>
          <Grid item xs={12} md={6}>
            <input type="submit" />
          </Grid>
        </Grid>
      </form>
    </>
  );
}
