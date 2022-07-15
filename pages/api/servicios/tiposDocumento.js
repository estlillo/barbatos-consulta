export default function handler(req, res) {
  const tiposDocumento = [
    {
      id: 10,
      description: "Carta",
    },
    {
      id: 1,
      description: "Oficio ordinario",
    },
    {
      id: 77,
      description: "Oficio ordinario P/D",
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
