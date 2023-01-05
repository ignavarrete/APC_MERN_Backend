import nodemailer from 'nodemailer';

const emailRegistro = async (datos) => {
    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
    });

    const { email, nombre, token} = datos;
    
    const info = await transport.sendMail({
        from: "APH - Administrador de Pacientes de Hospital",
        to: email,
        subject: 'Valida tu cuenta en APH',
        text: 'Valida tu cuenta en APH',
        html: `<p>Hola ${nombre}, comprueba tu cuenta en APH. </p>
            <p>Tu cuenta ya casi está lista, solo debes comprobarla en el siguiente enlace:
            <a href="${process.env.FRONTEND_URL}/confirmar/${token}">Comprobar Cuenta</a> </p>

            <p>Si no creaste esta cuenta, puedes ignorar este mensaje</p>  
        `
    });
    console.log("Mensaje enviado: %s", info.messageId);
}

export default emailRegistro;