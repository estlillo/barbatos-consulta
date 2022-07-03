import React, { useEffect } from "react";
import axios from "axios";

export default function useConsultaDocumento(codigoBarra) {

  const [resultado, setResultado] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  useEffect(() => {
    if (codigoBarra) {
        setResultado([]);
      setIsLoading(true);
      axios
        .post("/api/buscarDocumento", {
          codigoBarra,
        })
        .then((response) => {
          setResultado(response.data);
          setIsLoading(false);
        });
    }
  }, [codigoBarra]);
  return [ isLoading, resultado, error ];
}
