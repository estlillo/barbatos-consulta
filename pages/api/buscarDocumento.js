import { obtenerAccessToken } from "./ObtenerToken";

export default async function handler(req, res) {
  const bearerToken = await obtenerAccessToken();

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Accept", "application/json");
  myHeaders.append("Authorization", bearerToken);

  var raw = JSON.stringify({
    codigoBarra: req.body,
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  const resultado = await fetch(process.env.EXEDOC_API_CONSULTAR_DOCUMENTO, requestOptions);

  const data = await resultado.json();

  console.log(data);

  res.status(200).json(data);
}


