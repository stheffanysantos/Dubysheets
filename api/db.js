import mysql from "mysql2";

// Criação da conexão
const connection = mysql.createConnection({
  host: 'duby.emconexaosistemas.com.br',   
  user: 'emcone59_controle_estoque',        
  password: '!8wif{xB+28x',        
  database: 'emcone59_controle_estoque', 
});

// Exporta a conexão
export default connection;
