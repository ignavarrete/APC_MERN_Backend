import mongoose from 'mongoose';

const pacienteSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    apellido: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    rut: {
        type: String
    },
    telefono: {
        type: Number
    },
    region: {
        type: String
    },
    comuna: {
        type: String
    },
    fecha: {
        type: Date,
        required: true,
        default: Date.now(),
    },
    sintomas: {
        type: String,
        required: true
    },
    medico:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Medico'
    }
}, 
    {
    timestamps: true
    }
);

const Paciente = mongoose.model('Paciente', pacienteSchema)

export default Paciente;