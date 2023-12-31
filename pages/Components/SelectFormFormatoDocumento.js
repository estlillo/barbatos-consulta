import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import React from "react";

export default function SelectFormFormatoDocumento({
  inputLabel,
  register,
  options,
  name,
  helper,
  disabled,
  errors,
  rules,
  setFormatoSeleccionado,
  ...props
}) {
  let errorMessages = "";
  if (errors && errors[name]) {
    errorMessages = errors[name];
  }

  const hasError = !!(errors && errorMessages);

  const [valor, setValor] = React.useState("");

  const handleChange = (event) => {
    setFormatoSeleccionado(event.target.value);
    setValor(event.target.value);
    console.log(valor);
  };

  return (
    <FormControl fullWidth margin="normal" error={hasError}>
      <InputLabel id="demo-simple-select-label">{inputLabel}</InputLabel>
      <Select
        {...(register && register(name, rules))}
        {...props}
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={valor}
        label={inputLabel}
        onChange={handleChange}
        disabled={disabled}
      >
        {options &&
          options.map((option, index) => (
            <MenuItem key={index} value={option.id}>
              {option.description}
            </MenuItem>
          ))}
      </Select>
      <FormHelperText>{errorMessages?.message || helper}</FormHelperText>
    </FormControl>
  );
}
