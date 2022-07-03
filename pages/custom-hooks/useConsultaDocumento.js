import React, { useEffect } from "react";
import axios from "axios";
import useAxios from "axios-hooks";

export default function useConsultaDocumento(codigoBarra) {
  const [{ data: resultado, loading: isLoading, error }, executePost] =
    useAxios(
      {
        url: "/api/buscarDocumento",
        method: "POST",
      },
      { manual: true }
    );

  useEffect(() => {
    if (codigoBarra) {
      executePost({
        data: {
          codigoBarra,
        },
      });
    }
  }, [codigoBarra]);
  return [isLoading, resultado, error];
}
