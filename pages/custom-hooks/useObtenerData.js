// useAxios hook (first draft)

import { useState, useEffect } from "react";
import axios from "axios";

const useObtenerData = ({ url }) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState("");
  const [loading, setloading] = useState(true);

  useEffect(() => {
    axios
      .get(url)
      .then((res) => {
        setResponse(res.data);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setloading(false);
      });
  }, [url]);

  // custom hook returns value
  return [response, loading, error];
};

export default useObtenerData;
