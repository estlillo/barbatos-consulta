// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const jsonDocumento = {
  id: 1,
  description: "Carta",
  tipo: "1",
  files : [
    {
     name: "documento.pdf",
     contentType : "application/pdf",
      data: "base64 encoded string"

    },
    {
      name: "documento2.pdf",
      contentType : "application/pdf",
      data: "base64 encoded string"
 
     }
  ]
}


export default function handler(req, res) {


  let documento = {};
  let archivos = [];


  archivos = jsonDocumento.files


documento = jsonDocumento;

console.log(documento);



  let sitePersonnel = {};
  let employees = [];
  sitePersonnel.employees = employees;
  console.log(sitePersonnel);
  
  let firstName = "John";
  let lastName = "Smith";
  let employee = {
    firstName,
    lastName,
  };
  sitePersonnel.employees.push(employee);
  
  console.log(JSON.stringify(sitePersonnel));




  res.status(200).json({ name: 'John Doe' })
}
