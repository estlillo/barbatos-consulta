export default function handler(req, res) {
  const tiposDocumento = [
    {
      id: 1,
      description: "Carta",
    },
    {
      id: 2,
      description: "Oficio ordinario",
    },
    {
      id: 3,
      description: "Resolución Exenta",
    },
    {
      id: 4,
      description: "Memorándum",
    },
  ];

  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(tiposDocumento));
}
