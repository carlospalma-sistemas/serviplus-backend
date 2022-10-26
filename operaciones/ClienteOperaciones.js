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
        const filtro = req.query;
        let listaclientes;
        if (filtro.q != null) {
            listaclientes = await clienteModelo.find({
                "$or" : [ 
                    { "nombres": { $regex:filtro.q, $options:"i" }},
                    { "apellidos": { $regex:filtro.q, $options:"i" }},
                    { "direccion": { $regex:filtro.q, $options:"i" }}
                ]
            });
        }
        else {
            listaclientes = await clienteModelo.find(filtro);
        }
        if (listaclientes.length > 0){
            res.status(200).send(listaclientes);
        } else {
            res.status(404).send("No hay datos");
        }
    } catch (error) {
        res.status(400).send("Mala petición. "+error);
    }
}

clienteOperaciones.buscarCliente = async (req, res)=>{
    try {
        const id = req.params.id;
        const cliente = await clienteModelo.findById(id);
        if (cliente != null){
            res.status(200).send(cliente);
        } else {
            res.status(404).send("No hay datos");
        }
    } catch (error) {
        res.status(400).send("Mala petición. "+error);
    }
}

clienteOperaciones.modificarCliente = async (req, res)=>{
    try {
        const id = req.params.id;
        const body = req.body;
        const datosActualizar = {
            nombres: body.nombres,
            apellidos: body.apellidos,
            direccion: body.direccion,
            telefono: body.telefono,
            passw: body.passw
        }
        const clienteActualizado = await clienteModelo.findByIdAndUpdate(id, datosActualizar, { new : true });
        if (clienteActualizado != null) {
            res.status(200).send(clienteActualizado);
        }
        else {
            res.status(404).send("No hay datos");
        }
    } catch (error) {
        res.status(400).send("Mala petición. "+error);
    }
}

clienteOperaciones.borrarCliente = async (req, res)=>{
    try {
        const id = req.params.id;
        const cliente = await clienteModelo.findByIdAndDelete(id);
        if (cliente != null){
            res.status(200).send(cliente);
        } else {
            res.status(404).send("No hay datos");
        }
    } catch (error) {
        res.status(400).send("Mala petición. "+error);
    }
}

module.exports = clienteOperaciones;