import React, { useEffect } from "react";
import axios from "axios";

export default function useConsultaExpediente(numeroExpediente) {
  const [resultado, setResultado] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  useEffect(() => {
    if (numeroExpediente) {
        setResultado([]);
      setIsLoading(true);
      axios
        .post("/api/buscarExpediente", {
          numeroExpediente,
        })
        .then((response) => {
          setResultado(response.data);
          setIsLoading(false);
        });
    }
  }, [numeroExpediente]);
  return { isLoading, resultado, error };
}
