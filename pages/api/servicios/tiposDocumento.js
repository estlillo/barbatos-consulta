export default function handler(req, res) {

  console.log(req.query);


  const tiposDocumento = [
    {
      id: 10,
      description: "Carta",
      formato: 3
    },
    {
      id: 1,
      description: "Oficio ordinario",
      formato: 3
    },
    {
      id: 77,
      description: "Oficio ordinario P/D",
      formato: 2
    },
    {
      id: 3,
      description: "Resolución Exenta",
      formato: 3
    },
    {
      id: 4,
      description: "Memorándum",
      formato: 3
    },
  ];


  const tipsoDocFiltrados = tiposDocumento.filter(function (td) {
    return td.formato == req.query.formato;  
  });

  console.log(tipsoDocFiltrados);

  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(tipsoDocFiltrados));
}
