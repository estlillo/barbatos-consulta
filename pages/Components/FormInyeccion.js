import { Button, Divider, FormControlLabel, Grid, Switch } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import React from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import useObtenerData from "@/customHooks/useObtenerData";
import SelectForm from "@/components/SelectForm";
import TextFieldForm from "@/components/TextFieldForm";
import JoditText from "@/components/JoditText";

import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "./DatePicker";
import  MultipleUsers  from "@/components/MultipleUsers";

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

 
  const methods = useForm({
    mode: 'all',
    reValidateMode: 'onChange',
    defaultValues: {}, // Apparently `defaultValues` being null is a DEAL BREAKER!
    shouldFocusError: true, // focus input field after submit if it is not following required rule of input field
  }); // re
  const { register, handleSubmit, formState: { errors } } = methods;

  const sendToApi = (data) => {
    alert(JSON.stringify(data));
    console.log(data);
  };

  return (
    <>
      <FormProvider { ...methods}>
        <form onSubmit={handleSubmit(sendToApi)}>
          <Grid container spacing={1}>
            <Grid item xs={12} md={12}>
              <FormControlLabel
                margin="normal"
                control={
                  <Switch
                    checked={isProceso}
                    onChange={handleChangeIsProceso}
                  />
                }
                label={labelProceso}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <SelectForm
                inputLabel="Proceso de documento"
                name="procesoDocumento"
                register={register}
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
                rules={{
                  required: "Campo Formato de documento es obligatorio",
                }}
                errors={errors}
                options={formatosDocumento}
                helper="Seleccione el formato de documento"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextFieldForm
                id="autor"
                name="autor"
                inputLabel="Autor"
                helper="Escribe el autor del documento"
                register={register}
                errors={errors}
                rules={{ required: "Campo autor es obligatorio" }}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextFieldForm
                id="emisor"
                name="emisor"
                inputLabel="Emisor"
                helper="Escribe el emisor del documento"
                register={register}
                errors={errors}
                rules={{ required: "Campo emisor es obligatorio" }}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextFieldForm
                id="destinatarios"
                name="destinatarios"
                inputLabel="Destinatarios"
                helper="Escribe los destinatarios del documento"
                register={register}
                errors={errors}
                rules={{ required: "Campo destinatarios es obligatorio" }}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextFieldForm
                id="ciudad"
                name="ciudad"
                inputLabel="Ciudad"
                helper="Escribe la ciudad del documento"
                register={register}
                errors={errors}
                rules={{ required: "Campo ciudad es obligatorio" }}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextFieldForm
                id="numeroExterno"
                name="numeroExterno"
                inputLabel="Número externo"
                helper="Escribe el número externo del documento"
                register={register}
                errors={errors}
                rules={{ required: "Campo número externo es obligatorio" }}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              {/* <DatePicker
            inputLabel="Fecha de documento"
            control={control}
            name="fecha"
            placeholder="Seleccione fecha"
          /> */}
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

            <Grid item xs={12} md={12}>
              <TextFieldForm
                id="contenido"
                name="contenido"
                inputLabel="Contenido"
                helper="Escribe el contenido del documento"
                multiline
                rows={10}
                register={register}
                errors={errors}
                rules={{ required: "Campo contenido es obligatorio" }}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <MultipleUsers
                nombreLista="visadores"
                label="Visadores de documento"
                register={register}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <MultipleUsers
                nombreLista="firmantes"
                label="Firmantes de documento"
                register={register}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <MultipleUsers
                nombreLista="distribucion"
                label="Lista de Distribución"
                register={register}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <Divider></Divider>
              <Button variant="contained" type="submit" endIcon={<SendIcon />}>
                Enviar
              </Button>
            </Grid>
          </Grid>
        </form>
      </FormProvider>
    </>
  );
}
