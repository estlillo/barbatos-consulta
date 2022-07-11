export default function handler(req, res) {
  const procesosDocumento = [
    {
      id: 1,
      description: "Carta 1 visador 1 firmante",
    },
    {
      id: 2,
      description: "Carta 2 firmantes",
    },
    {
      id: 3,
      description: "Oficio firma simple",
    },
    {
      id: 4,
      description: "Oficio firma api",
    },
    {
      id: 5,
      description: "Memorandum proceso interno",
    },
  ];

  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(procesosDocumento));
}