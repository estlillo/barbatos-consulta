import React, { useCallback, useEffect } from "react";
import axios from "axios";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

export default function useConsultaDocumento(codigoBarra) {
  const [resultado, setResultado] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const { executeRecaptcha } = useGoogleReCaptcha();

  const submitEnquiryForm = (gReCaptchaToken) => {
    axios
        .post("/api/validarGoogleCaptcha", {
          gReCaptchaToken,
    })
      .then((res) => {
        if (res?.data?.status === "success") {
          axios
            .post("/api/buscarDocumento", {
              codigoBarra,
            })
            .then((response) => {
              setResultado(response.data);
              setIsLoading(false);
              
            });

          setResultado(res?.message);
        } else {
          setResultado(res?.message);
          setIsLoading(false);
        }
      });
  };

  useEffect(() => {
    if (codigoBarra) {
      setResultado([]);
      setIsLoading(true);
      if (!executeRecaptcha) {
        return;
      }

      executeRecaptcha("enquiryFormSubmit").then((gReCaptchaToken) => {
        submitEnquiryForm(gReCaptchaToken);
      });
    }
  }, [codigoBarra]);
  return [isLoading, resultado, error];
}
