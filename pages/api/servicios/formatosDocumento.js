export default function handler(req, res) {
  const formatosDocumento = [
    {
      id: 1,
      description: "PAPEL",
    },
    {
      id: 2,
      description: "DIGITAL",
    },
    {
      id: 3,
      description: "ELECTRÓNICO",
    }
  ];

  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(formatosDocumento));
}
