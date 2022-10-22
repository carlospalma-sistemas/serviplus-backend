const clienteModelo = require("../modelos/ClienteModelo");
const clienteOperaciones = {}

clienteOperaciones.crearCliente = async (req, res)=>{
    try {
        const objeto = req.body;
        console.log(objeto);
        const cliente = new clienteModelo(objeto);
        const clienteGuardado = await cliente.save();
        res.status(201).send(clienteGuardado);
    } catch (error) {
        res.status(400).send("Mala petición. "+error);
    }
}

clienteOperaciones.buscarClientes = async (req, res)=>{
    try {
        const listaclientes = await clienteModelo.find();
        if (listaclientes.length > 0){
            res.status(200).send(listaclientes);
        } else {
            res.status(404).send("No hay datos");
        }
    } catch (error) {
        res.status(400).send("Mala petición.");
    }
}

clienteOperaciones.modificarCliente = async (req, res)=>{
    
}

module.exports = clienteOperaciones;