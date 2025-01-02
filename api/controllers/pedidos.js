import db from "../db.js";

// Buscar todos os pedidos
export const getPedidos = (_, res) => {
  const q = "SELECT * FROM pedidos";

  db.query(q, (err, data) => {
    if (err) return res.json(err);

    return res.status(200).json(data);
  });
};

export const addPedido = (req, res) => {
  const q = "INSERT INTO pedidos(`data`, `produto`, `quantidade`, `preco`, `unidade`, `empresa`, `status`,`turno`, `observacao`, `previsao`) VALUES(?)";
  const values = [
    req.body.data,
    req.body.produto,
    req.body.quantidade,
    req.body.preco,
    req.body.unidade,
    req.body.empresa,
    req.body.status,
    req.body.turno,
    req.body.observacao,
    req.body.previsao
  ];

  db.query(q, [values], (err, result) => {
    if (err) {
      console.error('Erro ao adicionar pedido:', err);
      return res.status(500).json({ fatal: true, message: 'Erro ao adicionar pedido', error: err.message });
    }

    // Retorna todos os dados do pedido criado, incluindo o ID gerado
    const novoPedido = {
      id: result.insertId,
      ...req.body // Inclui todos os dados que foram passados no corpo da requisição
    };

    return res.status(200).json(novoPedido); // Retorna o pedido completo
  });
};


// Atualizar um pedido
export const updatePedido = (req, res) => {
  const q = "UPDATE pedidos SET `data` = ?, `produto` = ?, `quantidade` = ?, `preco` = ?, `unidade` = ?, `empresa` = ?, `status` = ?,`turno`= ?, `observacao` = ?, `previsao` = ? WHERE `id` = ?";

  const values = [
    req.body.data,
    req.body.produto,
    req.body.quantidade,
    req.body.preco,
    req.body.unidade,
    req.body.empresa,
    req.body.status,
    req.body.turno,
    req.body.observacao,
    req.body.previsao,
  ];

  db.query(q, [...values, req.params.id], (err, result) => {
    if (err) {
      console.error('Erro ao atualizar pedido:', err);
      return res.status(500).json({ message: "Erro ao atualizar pedido", error: err.message });
    }

    // Se o pedido for atualizado com sucesso, retornamos a confirmação
    return res.status(200).json({ message: "Pedido atualizado com sucesso" });
  });
};


// Deletar um pedido
export const deletePedido = (req, res) => {
  const q = "DELETE FROM pedidos WHERE `id` = ?";

  db.query(q, [req.params.id], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Pedido deletado com sucesso.");
  });
};
