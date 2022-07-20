// useAxios hook (first draft)

import { useState, useEffect } from "react";
import axios from "axios";

const useTiposDocumento = ({ url, formato }) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState("");
  const [loading, setloading] = useState(true);

  useEffect(() => {
    console.log("useTipoDoc " + url + " params "+ formato);
    axios
      .get(url,{ params: { formato } })
      .then((res) => {
        setResponse(res.data);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setloading(false);
      });
  }, [url, formato]);

  // custom hook returns value
  return [response, loading, error];
};

export default useTiposDocumento;
