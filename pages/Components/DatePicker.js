import { FormControl, InputLabel } from "@mui/material";
import React from "react";
import PropTypes from 'prop-types';
import ReactDatePicker from "react-datepicker";
import { Controller, useForm, useFormContext } from "react-hook-form";
import "react-datepicker/dist/react-datepicker.css";

export default function DatePicker({ inputLabel, name, placeholder }) {


  if (!name) name = "";
  if (!inputLabel) inputLabel = "";
  if (!placeholder) placeholder = "";
  const { control } = useForm();
  return (
    <FormControl fullWidth margin="normal">
      <InputLabel id="demo-simple-select-label">{inputLabel}</InputLabel>


      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <ReactDatePicker
            placeholderText={placeholder}
            onChange={(e) => field.onChange(e)}
            selected={field.value}
          />
        )}
      />
    </FormControl>
  );
}