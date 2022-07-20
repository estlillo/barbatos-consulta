export default function handler(req, res) {
  const formatosDocumento = [
    {
      id: 3,
      description: "ELECTRÓNICO",
    },
    {
      id: 2,
      description: "PAPEL / DIGITAL",
    }
  ];

  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(formatosDocumento));
}
