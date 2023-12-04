const express = require("express");
const app = express();
const mysql = require("mysql2");
const cors = require("cors");
const http = require("http").createServer(app);
const io = require("socket.io")(http);

app.use(cors());
app.use(express.json());

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "delas123",
  database: "delas",
  port: "3306",
});

const solicitacoesPendentes = [];

io.on("connection", (socket) => {
  console.log("Novo usuário conectado");

  socket.on("corridaAceita", ({ idCorrida, idMotorista, idPassageira }) => {
    const updateCorridaStatusSQL =
      "UPDATE Corrida SET Status = 'Aceita', Id_Motorista = ?, Id_Passageira = ? WHERE ID_Corrida = ?";
      
    db.query(updateCorridaStatusSQL, [idMotorista, idPassageira, idCorrida], (err, result) => {
      if (err) {
        console.error("Erro ao atualizar o status da corrida:", err);
      } else {
        console.log(`Status da corrida ${idCorrida} atualizado para 'Aceita'`);
        console.log(`ID do Motorista: ${idMotorista}, ID da Passageira: ${idPassageira}`);
      }
  
      io.emit("corridaAceita", { idCorrida });
      console.log("Confirmação de aceitação enviada para o passageiro");
    });
  });

  socket.on("finalizarCorrida", ({ idCorrida }) => {
    const updateCorridaStatusSQL =
      "UPDATE Corrida SET Status = 'Finalizada' WHERE ID_Corrida = ?";
    db.query(updateCorridaStatusSQL, [idCorrida], (err, result) => {
      if (err) {
        console.error("Erro ao atualizar o status da corrida:", err);
      } else {
        console.log("Status da corrida atualizado para 'Finalizada'");
      }
      io.emit("corridaFinalizada", { idCorrida });
      console.log("Notificação de corrida finalizada enviada para o passageiro");
    });
  });

  socket.on("novaCorrida", (novaSolicitacao) => {
    console.log("Recebido do cliente passageiro:", novaSolicitacao);
    solicitacoesPendentes.push(novaSolicitacao);
    io.emit("novaSolicitacao", novaSolicitacao);
  });

  socket.on("disconnect", () => {
    console.log("Usuário desconectado");
  });
});

// Cadastro de Passageiro

app.post("/cadPas", (req, res) => {
  const { nome, cpf, email, senha } = req.body;
  console.log("Dados recebidos:", req.body);
  let SQL =
    "INSERT INTO passageira (Nome, CPF_Passageira, Email, Senha) VALUES (?, ?, ?, ?)";
  db.query(SQL, [nome, cpf, email, senha], (err, result) => {
    if (err) {
      console.error("Erro ao cadastrar passageira:", err);
      res.status(500).send("Erro ao cadastrar passageira: " + err.message);
    } else {
      res.sendStatus(200);
    }
  });
});

// Solicita Corrida

app.post("/solicitarCorrida", (req, res) => {
  const {
    distancia,
    valor,
    origem,
    destino,
    horario,
    idPassageira,
    idMotorista,
  } = req.body;

  console.log("Dados recebidos:", req.body);

  const insertCorridaSQL = `
    INSERT INTO Corrida (Distancia, Valor, Origem, Destino, Horario, ID_Passageira, Id_Motorista, Status)
    VALUES (?, ?, ?, ?, ?, ?, ?, 'Pendente')
  `;

  db.query(
    insertCorridaSQL,
    [distancia, valor, origem, destino, horario, idPassageira, idMotorista],
    (err, result) => {
      if (err) {
        console.error("Erro ao cadastrar corrida:", err);
        res.status(500).send("Erro ao cadastrar corrida: " + err.message);
      } else {
        const idCorrida = result.insertId;
        // Emitir evento para notificar motoristas sobre a nova corrida
        io.emit("novaCorrida", { idCorrida });
        res.sendStatus(200);
      }
    }
  );
});

// Cadastro Motorista e Carro

app.post("/cadMot", (req, res) => {
  const { motorista, carro } = req.body;

  if (!motorista || !carro) {
    return res.status(400).send("Dados incompletos");
  }

  const { nome, cnh, email, senha } = motorista;
  const { placa, marca, modelo, cor } = carro;

  console.log("Dados recebidos no backend:", {
    nome,
    cnh,
    email,
    senha,
    placa,
    marca,
    modelo,
    cor,
  });

  // Inserir dados do motorista na tabela Motorista
  let motoristaSQL =
    "INSERT INTO Motorista (Nome, CNH, Email, Senha) VALUES (?, ?, ?, ?)";
  db.query(motoristaSQL, [nome, cnh, email, senha], (err, result) => {
    if (err) {
      console.error("Erro ao cadastrar motorista:", err);
      return res
        .status(500)
        .send("Erro ao cadastrar motorista: " + err.message);
    }

    // Recuperar o ID do motorista recém-cadastrado
    const idMotorista = result.insertId;

    // Inserir dados do carro na tabela Carro
    let carroSQL =
      "INSERT INTO Carro (Placa, Marca, Modelo, Cor, Id_Motorista) VALUES (?, ?, ?, ?, ?)";
    db.query(
      carroSQL,
      [placa, marca, modelo, cor, idMotorista],
      (err, result) => {
        if (err) {
          console.error("Erro ao cadastrar carro:", err);
          return res
            .status(500)
            .send("Erro ao cadastrar carro: " + err.message);
        }
        res.sendStatus(200);
      }
    );
  });
});

//Buscar Corridas

app.get("/corridas/finalizadas", (req, res) => {
  console.log("Acessando corridas finalizadas...");

  let SQL = "SELECT * FROM Corrida WHERE status = 'finalizada'";

  db.query(SQL, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Erro ao buscar corridas finalizadas");
    } else {
      res.send(result);
    }
  });
});

http.listen(3001, () => {
  console.log("Servidor Delas rodando na porta 3001");
});
