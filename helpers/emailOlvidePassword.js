import nodemailer from 'nodemailer';

const emailOlvidePassword= async (datos) => {
    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
    });

    const { email, nombre, token} = datos;
    
    console.log(token);
    
    const info = await transport.sendMail({
        from: "APH - Administrador de Pacientes de Hospital",
        to: email,
        subject: 'Reestablece tu contraseña en APH',
        text: 'Reestablece tu contraseña en APH',
        html: `<p>Hola ${nombre}, has solicitado reestablecer tu contraseña </p>
            <p>Sigue el siguiente enlace para cambiar tu contraseña:
            <a href="${process.env.FRONTEND_URL}/olvide-password/${token}">Reestablecer Contraseña</a> </p>

            <p>Si no solicitaste cambio de contraseña, puedes ignorar este mensaje</p>
        `
    });
    console.log("Mensaje enviado: %s", info.messageId);
}

export default emailOlvidePassword;