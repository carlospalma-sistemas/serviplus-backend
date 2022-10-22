const clienteOperaciones = require("../operaciones/ClienteOperaciones");
const router = require("express").Router();

router.get("/", clienteOperaciones.buscarClientes);
router.post("/", clienteOperaciones.crearCliente);

module.exports = router;