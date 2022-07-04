import React, { useCallback, useEffect } from "react";
import axios from "axios";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

export default function useConsultaDocumento(codigoBarra) {
  const [resultado, setResultado] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const { executeRecaptcha } = useGoogleReCaptcha();

  const submitEnquiryForm = (gReCaptchaToken) => {
    fetch("/api/validarGoogleCaptcha", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        gRecaptchaToken: gReCaptchaToken,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res, "response from backend");
        if (res?.status === "success") {
          axios
            .post("/api/buscarDocumento", {
              codigoBarra,
            })
            .then((response) => {
              setResultado(response.data);
              setIsLoading(false);
              
            });

          setResultado(res?.message);
          setIsLoading(false);
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
        console.log("Execute recaptcha not yet available");
        return;
      }

      executeRecaptcha("enquiryFormSubmit").then((gReCaptchaToken) => {
        console.log(gReCaptchaToken, "response Google reCaptcha server");

        submitEnquiryForm(gReCaptchaToken);
      });
    }
  }, [codigoBarra]);
  return [isLoading, resultado, error];
}
