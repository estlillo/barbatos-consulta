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
        console.log(res?.data?.status);
        if (res?.data?.status === "success") {
          console.log("se preguntara a mds");
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
