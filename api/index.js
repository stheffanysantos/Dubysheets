import express from "express";
import cors from "cors";
import router from "./routes/users.js";
import db from "./db.js"; // Importa a conexão com o banco de dados


const app = express();

app.use(express.json());
app.use(cors());



// Rota de teste para ver se o servidor está funcionando
app.get("/", (req, res) => {
  console.log("Recebendo uma requisição GET na raiz.");
  res.send("Servidor está funcionando!");
});

// Rota de usuários
app.use("/api", router); // API estará acessível via http://localhost:8800/api


// Verifica a conexão com o banco de dados antes de iniciar o servidor
db.connect((err) => {
  if (err) {
    console.error('Erro ao conectar com o banco de dados: ', err.message);
    process.exit(1); // Finaliza o processo caso a conexão falhe
  } else {
    console.log('Conexão com o banco de dados estabelecida com sucesso!');
    
    // Inicia o servidor após a conexão ser bem-sucedida
    app.listen(8800, () => {
      console.log("Servidor iniciado na porta 8800...");
    });
  }
});
