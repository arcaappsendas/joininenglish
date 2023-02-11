const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const chalk = require("chalk");

module.exports = {


    enviarMail: async function (asunto, cuerpo, email)
    {
        var mailOptions = {
            from: 'el_joven_cantor@hotmail.com',
            to: email,
            subject: asunto,
            text: cuerpo
        };

        var transporter = nodemailer.createTransport({
            service: 'hotmail',
            auth: {
                user: 'el_joven_cantor@hotmail.com',
                pass: '%f4z6yq6$oW5y!$8q^5@'
            }
        });
        try
        {
            await transporter.sendMail(mailOptions).then((ret) =>
            {
                console.log(chalk.green(`\n==> MAIL ENVIADO A ${email} `));
                //console.log(ret);
                return 'Las credenciales de acceso a la plataforma, se han enviado a tu cuenta de email registrada en nuestro sistema.';
            });

            //console.log('paso por aqui........................');
        } catch (e)
        {
            console.log(chalk.red(`\n==> ERROR:  ${e} `));
            //console.log('Se ha generado un error en el proceso, por favor vuelve a intentarlo.');
            return 'Se ha generado un error en el proceso, por favor vuelve a intentarlo.';
        }
    }

}