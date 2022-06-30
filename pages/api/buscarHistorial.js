import { obtenerAccessToken } from "./ObtenerToken";

export default async function handler(req, res) {


  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Accept", "application/json");



  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  const resultado = await fetch(process.env.EXEDOC_API_HISTORIAL_ENDPOINT+"/"+req.body, requestOptions);

  const data = await resultado.json();

  console.log(data);

  res.status(200).json(data);
}



