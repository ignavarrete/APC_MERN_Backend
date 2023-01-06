import sgMail from "@sendgrid/mail";

const emailOlvidePassword= async (datos) => {
    const { email, nombre, token } = data;

  const htmlRestablecer = `
  <div style="font-family: 'Open Sans','Roboto','Helvetica Neue',Helvetica,Arial,sans-serif; font-size: 16px; color: #757575; line-height: 150%; letter-spacing: normal;">
  <div style="background: #4f46e5; padding: 50px 10px;">
  <div style="max-width: 600px; margin: auto;">
  <div style="background: white; padding: 15px 30px 25px 30px; border-radius: 5px;">
  <div style="text-align: center; margin: 20px 0 30px;"><span style="font-weight: bold; color: #4f46e5; font-size: 30px; margin-left: 10px;">Restablecer password en Administrador de Pacientes de Clínica</span></div>
  <p style="color: #757575; font-family: 'Open Sans', Roboto, 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 16px; letter-spacing: normal;">Hola ${nombre}&nbsp;</p>
  <p style="color: #757575; font-family: 'Open Sans', Roboto, 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 16px; letter-spacing: normal;">Has solicitado restablecer tu password en Administrador de Pacientes de Clínica</p>
  <p>Sigue el siguiente enlace para generar un nuevo password:&nbsp;</p>
  <p style="color: #757575; font-family: 'Open Sans', Roboto, 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 16px; letter-spacing: normal;"><a style="background: #4f46e5; color: white; font-weight: 500; display: inline-block; padding: 10px 35px; margin: 6px 8px; text-decoration: none; border-radius: 2px;" href="${process.env.FRONTEND_URL}/olvide-password/${token}" target="_blank" rel="noopener">Restablecer password</a></p>
  <p style="color: #757575; font-family: 'Open Sans', Roboto, 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 16px; letter-spacing: normal;">El enlace expira inmediatamente cuando se abre.</p>
  <p style="color: #757575; font-family: 'Open Sans', Roboto, 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 16px; letter-spacing: normal;">Si tu no solicitaste este cambio, puedes ignorar el mensaje.</p>
  </div>
  </div>
  </div>
  <div style="background: #4f46e5; color: white; font-size: 12px; padding: 30px 10px 30px 10px;">
  <div style="max-width: 600px; margin: auto; text-align: center;"><hr style="border: 1px solid #f2f2f2;">
  <p style="font-style: italic; margin-bottom: 0;">Copyright &copy; 2023 Administrador de Pacientes de Clínica, All rights reserved.</p>
  <hr style="border: 1px solid #f2f2f2;"></div>
  <div class="yj6qo">&nbsp;</div>
  <div class="adL">&nbsp;</div>
  </div>
  <div class="adL" style="color: #757575; font-family: 'Open Sans', Roboto, 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 16px; letter-spacing: normal;">&nbsp;</div>
  </div>
`;

  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  const msg = {
    to: email,
    from: "marioig.navarrete@gmail.com",
    subject: "Restablecer password - Administrador de Pacientes de Clínica.",
    text: "Administrador de Pacientes de Clínica",
    html: htmlRestablecer,
  };
  sgMail
    .send(msg)
    .then(() => {
      console.log("Email Enviado");
    })
    .catch((error) => {
      console.error(error);
    });

}

export default emailOlvidePassword;