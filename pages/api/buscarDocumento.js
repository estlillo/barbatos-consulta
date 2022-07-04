import { obtenerAccessToken } from "./ObtenerToken";
import axios from "axios";

export default async function handler(req, res) {

  try {
    let codigoBarra = req.body.codigoBarra;

    if (
      req.body.codigoBarra == "" ||
      req.body.codigoBarra == null ||
      req.body.codigoBarra == undefined
    ) {
      codigoBarra = "";
    }

    const bearerToken = await obtenerAccessToken();

    console.log("BEARER "+bearerToken);

    const body = {
      codigoBarra: codigoBarra,
    };

    axios.post(
      process.env.EXEDOC_API_CONSULTAR_DOCUMENTO,
      body,
      {
        headers: {
          Authorization: bearerToken,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    ).then((response) => {
      res.status(200).json(response.data);
    });

  
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}


