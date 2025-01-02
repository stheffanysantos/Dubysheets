import express from "express";
import cors from "cors";
import pedidosRoutes from "./routes/pedidos.js";
import db from "./db.js";

const app = express();

app.use(express.json());
app.use(cors());

// Rota de teste
app.get("/", (req, res) => {
  res.status(200).send("Servidor funcionando!");
});

// Registra as rotas
app.use("/api/pedidos", pedidosRoutes); // Rotas de pedidos
   // Rotas de autenticação

// Verifica a conexão com o banco de dados antes de iniciar o servidor
db.connect((err) => {
  if (err) {
    console.error("Erro ao conectar com o banco de dados:", err.message);
    process.exit(1); // Sai do processo em caso de erro de conexão
  } else {
    console.log("Conexão com o banco de dados estabelecida com sucesso!");
    app.listen(8800, () => {
      console.log("Servidor rodando na porta 8800...");
    });
  }
});
