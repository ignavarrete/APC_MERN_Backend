import Paciente from "../models/Paciente.js";

const agregarPaciente = async (req, res) => {
    const paciente = new Paciente(req.body)
    paciente.medico = req.medico._id

    try {
        const pacienteAlmacenado = await paciente.save()
        res.json(pacienteAlmacenado)
        console.log(paciente)
    } catch (error) {
        console.log(error);
    }
}

const obtenerPacientes = async (req, res) => {
    const pacientes = await Paciente.find().where('medico').equals(req.medico);
    res.json(pacientes)
}

const obtenerPaciente = async (req, res) => {
    const { id } = req.params;
    const paciente = await Paciente.findById(id);

    if (!paciente) {
        return res.status(404).json({msg: 'No encontrado'});
    }

    if(paciente.medico._id.toString() !== req.medico._id.toString()) {
       return res.json({msg: 'Acción no válida'});
    }
    res.json(paciente)
}

const actualizarPaciente = async (req, res) => {
    const { id } = req.params;
    const paciente = await Paciente.findById(id);

    if (!paciente) {
        return res.status(404).json({msg: 'No encontrado'});
    }

    if(paciente.medico._id.toString() !== req.medico._id.toString()) {
       return res.json({msg: 'Acción no válida'});
    }

    paciente.nombre = req.body.nombre || paciente.nombre;
    paciente.apellido = req.body.apellido || paciente.apellido;
    paciente.email = req.body.email || paciente.email;
    paciente.rut = req.body.rut || paciente.rut;
    paciente.telefono = req.body.telefono || paciente.telefono;
    paciente.region = req.body.region || paciente.region;
    paciente.comuna = req.body.comuna || paciente.comuna;
    paciente.fecha = req.body.fecha || paciente.fecha;
    paciente.sintomas = req.body.sintomas || paciente.sintomas;

    try {
        const pacienteActualizado = await paciente.save();
        res.json(pacienteActualizado);
    } catch (error) {
        console.log(error);
    }
}

const eliminarPaciente = async (req, res) => {
    const { id } = req.params;
    const paciente = await Paciente.findById(id);

    if (!paciente) {
        return res.status(404).json({msg: 'No encontrado'});
    }

    if(paciente.medico._id.toString() !== req.medico._id.toString()) {
       return res.json({msg: 'Acción no válida'});
    }
    
    try {
        await paciente.deleteOne();
        res.json ({msg: 'Paciente eliminado'});
    } catch (error) {
        console.log(error);
    }
}

export { agregarPaciente, obtenerPacientes, obtenerPaciente, actualizarPaciente, eliminarPaciente};