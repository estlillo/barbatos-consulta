import stream from "stream";
import { promisify } from "util";

const pipeline = promisify(stream.pipeline);

const handler = async (req, res) => {
  const { url } = req.query;

  const response = await fetch(url); // replace this with your API call & options
  
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", "attachment; filename=Documento.pdf");
  await pipeline(response.body, res);
};

export default handler;
