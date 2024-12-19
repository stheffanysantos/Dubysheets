import express from "express";
import { getPedidos, addPedido, updatePedido, deletePedido } from "../controllers/user.js";

const router = express.Router();

// Obter todos os pedidos
router.get("/", getPedidos);

// Adicionar um novo pedido
router.post("/", addPedido);

// Atualizar um pedido existente
router.put("/:id", updatePedido);

// Deletar um pedido
router.delete("/:id", deletePedido);

router.get("/users", (req, res) => {
    res.json({ message: "Rota de usuários funcionando!" });
});

export default router;
