import fs from "node:fs";

export function reqBody (req, callback) {
  let data = "";
  req.on("data", (chunk) => (data += chunk));
  req.on("end", () => {
    try {
      const jsonData = JSON.parse(data);
      callback(jsonData);
    } catch (err) {
      callback(null, err);
    }
  });
};

export function addFuncionario (novoFuncionario) {
  fs.readFile("funcionarios.json", "utf-8", (err, data) => {
    if (err) {
      console.error("Error ao ler o arquivo JSON", err);
      response.writeHead(500, { "Content-Type": "application/json" });
      response.end(JSON.stringify({ message: "Erro ao ler o arquivo" }));
    }
    try {
      const funcionarios = JSON.parse(data);
      const novoId = funcionarios.length > 0 ? funcionarios + 1 : undefined;
      novoFuncionario.id = novoId;
      funcionarios.push(novoFuncionario);
      fs.writeFile("funcionarios.json", JSON.stringify(funcionarios), (err) => {
        if (err) {
          console.error("Erro ao escrever o arquivo JSON", err);
          response.writeHead(500, { "Content-Type": "application/json" });
          response.end(
            JSON.stringify({ message: "Erro ao escrever o arquivo" })
          );
        }
        response.writeHead(201, { "Content-Type": "application/json" });
        response.end(JSON.stringify(novoFuncionario));
        console.log("Funcionário adicionado com sucesso");
      });
    } catch (err) {
      console.error("Erro ao ler o arquivo JSON", err);
      response.writeHead(500, { "Content-Type": "application/json" });
      response.end(JSON.stringify({ message: "Erro ao ler o arquivo" }));
      console.log("Erro ao ler o arquivo JSON");
      console.log(err);
    }
  });
};

