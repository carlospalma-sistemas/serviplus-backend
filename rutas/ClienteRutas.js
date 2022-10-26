const clienteOperaciones = require("../operaciones/ClienteOperaciones");
const router = require("express").Router();

router.get("/", clienteOperaciones.buscarClientes);
router.get("/:id", clienteOperaciones.buscarCliente);
router.post("/", clienteOperaciones.crearCliente);
router.put("/:id", clienteOperaciones.modificarCliente);

module.exports = router;