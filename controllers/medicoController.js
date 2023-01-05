import Medico from "../models/Medico.js";
import generarJWT from "../helpers/generarJWT.js";
import generarId from "../helpers/generarId.js";
import emailRegistro from "../helpers/emailRegistro.js";
import emailOlvidePassword from "../helpers/emailOlvidePassword.js";

const registrar = async (req, res) => {
    const { nombre, email } = req.body;

    const existeUsuario = await Medico.findOne({email})

    if(existeUsuario){
        const error = new Error('Usuario ya registrado');
        return res.status(400).json({msg: error.message})
    }

    try {
        const medico = new Medico(req.body);

        const medicoGuardado = await medico.save();

        emailRegistro({
            email,
            nombre,
            token: medicoGuardado.token
        })
        res.json(medicoGuardado);
    } catch (error) {
        console.log(error)
    }

};

const perfil =  (req, res) => {
    const { medico } = req;
    res.json(medico);
}

const confirmar = async (req, res) => {
    const { token } = req.params

    const usuarioConfirmar = await Medico.findOne({token});

    if (!usuarioConfirmar) {
        const error = new Error('Token no válido');
        return res.status(404).json({msg: error.message});
    }

    try {
        usuarioConfirmar.token = null;
        usuarioConfirmar.confirmado = true;

        await usuarioConfirmar.save();

        res.json({msg: 'Usuario confirmado correctamente'});
    } catch (error) {
        console.log(error);
    }
}

const autenticar = async (req, res) => {
    const { email, password } = req.body;

    const usuario = await Medico.findOne({ email})

    if(!usuario){
        const error = new Error('El usuario no existe');
        return res.status(403).json({msg: error.message});
    } 

    if(!usuario.confirmado) {
        const error = new Error('Tu cuenta no ha sido confirmada');
        return res.status(403).json({msg: error.message});
    }

    if( await usuario.comprobarPassword(password)) {
        res.json({
            _id: usuario._id,
            nombre: usuario.nombre,
            email: usuario.email,
            token: generarJWT(usuario.id)
        });
    } else {
        const error = new Error('El Password es incorrecto');
        return res.status(403).json({msg: error.message});
    }
}

const olvidePassword = async (req, res) => {
    const { email} = req.body;
    const existeMedico = await Medico.findOne({ email });

    if(!existeMedico) {
        const error = new Error('El usuario no existe');
        return res.status(404).json({msg: error.message});
    }

    try {
       existeMedico.token = generarId()
       await existeMedico.save();

       emailOlvidePassword({
        email, 
        nombre: existeMedico.nombre,
        token: existeMedico.token,
       })
       res.json({msg: 'Revisa tu email para seguir las instrucciones'})
    } catch (error) {
        console.log(error);
    }
}

const comprobarToken = async (req, res) => {
    const { token } = req.params;
    const tokenValido = await Medico.findOne({ token});

    if(tokenValido) {
        res.json({msg: 'Token válido, el usuario existe'})
    } else {
        const error = new Error('Token no válido');
        return res.status(404).json({msg: error.message});
    }
}

const nuevoPassword = async (req, res) => {
    const {token} = req.params;
    const { password } = req.body;

    const medico = await Medico.findOne({token})

    if(!medico) {
        const error = new Error('Hubo un error');
        return res.status(400).json({msg: error.message});
    }

    try {
        medico.token = null 
        medico.password = password;
        await medico.save();
        res.json({msg: 'El password fue modificado correctamente'});
    } catch (error) {
        console.log(error);
    }
}

const actualizarPerfil = async (req, res) => {
    const medico = await Medico.findById(req.params.id); 

    if(!medico) {
        const error = new Error('Hubo un error')
        return res.status(400).json({ msg: error.message});
    }

    const { email } = req.body;
    if(medico.email !== req.body.email) {
        const existeEmail = await Medico.findOne({email})

        if(existeEmail) {
            const error = new Error('Ese email ya está en uso')
            return res.status(400).json({ msg: error.message});
        }
    }

    try {
        medico.nombre = req.body.nombre;
        medico.email = req.body.email;
        medico.telefono = req.body.telefono;

        const medicoActualizado = await medico.save();
        res.json(medicoActualizado);

    } catch (error) {
        console.log(error)
    }
}

const actualizarPassword = async (req, res) => {
    const { id } = req.medico
    const {pwd_actual, pwd_nuevo} = req.body;

    const medico = await Medico.findById(id);
    if(!medico) {
        const error = new Error('Hubo un error')
        return res.status(400).json({ msg: error.message});
    }

    if(await medico.comprobarPassword(pwd_actual)){
        medico.password = pwd_nuevo;  
        await medico.save();
        res.json({msg: 'Password almacenado correctamente'})
    } else {
        const error = new Error('El password actual es incorrecto')
        return res.status(400).json({ msg: error.message});
    }
}

export {
    registrar,
    perfil,
    confirmar,
    autenticar,
    olvidePassword,
    comprobarToken,
    nuevoPassword, 
    actualizarPerfil, 
    actualizarPassword
}