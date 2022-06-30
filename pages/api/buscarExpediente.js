import { obtenerAccessToken } from "./ObtenerToken";
import axios from "axios";

export default async function handler(req, res) {
  try {
    let numero = req.body.numeroExpediente;

    if (
      req.body.numeroExpediente == "" ||
      req.body.numeroExpediente == null ||
      req.body.numeroExpediente == undefined
    ) {
      numero = "";
    }

    const bearerToken = await obtenerAccessToken();

    console.log("BEARERRR "+bearerToken);

    const body = {
      numeroExpediente: numero,
    };

    axios.post(
      process.env.EXEDOC_API_CONSULTAR_EXPEDIENTE,
      body,
      {
        headers: {
          Authorization: bearerToken,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    ).then((response) => {
      console.log(response)
      res.status(200).json(response.data);
    });

  
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
}
