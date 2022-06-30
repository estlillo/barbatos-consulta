import axios from "axios";

export async function obtenerAccessToken() {
  const result = await axios.post(process.env.EXEDOC_API_TOKEN, {
    "client-id": process.env.EXEDOC_API_KEY,
    "secret-key": process.env.EXEDOC_API_SECRET,
  });


  const bearerToken = "Bearer " + result.data.access_token;

  return bearerToken;
}
