const express = require('express');
const mail = require('./mail.js');
const base = require('./base.js');
const cors = require("cors");
const chalk = require("chalk");
const mysql = require('mysql2');


const webApp = express();
require('dotenv').config();
webApp.use(cors({ origin: "*" }));

webApp.use(express.urlencoded({
    extended: true
}));
webApp.use(express.json());
const PORT = process.env.PORT;


webApp.get('/', (req, res) =>
{
    res.send(`Hello World.!`);
});

//PARA FUNCIONAR
webApp.post('/cedula', async (req, res) =>
{
    console.log(chalk.yellow('==> INGRESÓ REQUERIMEINTO'));

    var op = JSON.parse(JSON.stringify(req.body.queryResult));
    op.outputContexts.map(intent =>
    {
        let valores = intent.name.split('/');
        var intentName = valores[valores.length - 1];

        if (intentName === 'opcion-horario')
        {
            console.log(chalk.cyan(`\n==> INTENT [${intentName}] `));
            console.log(chalk.yellow(`\n==> ENVIANDO RESPUESTA horario `));
            var cedula = JSON.stringify(req.body.queryResult.parameters.number);
            return base.horario(cedula).then((ret) =>
            {
                console.log(chalk.yellow(`\n==> ENVIANDO RESPUESTA ${ret}`));
                res.send({
                    fulfillmentText: `${ret}`
                });

            });
        } else
            //SIGNIFICA QUE ES LA OPCION DE PAGO
            if (intentName === 'opcion-informacion-pago')
            {
                console.log(chalk.cyan(`\n==> INTENT [${intentName}] `));
                var cedula = JSON.stringify(req.body.queryResult.parameters.number);
                base.pago(cedula).then((ret) =>
                {
                    console.log(chalk.yellow(`\n==> ENVIANDO RESPUESTA horario ${ret}`));
                    res.send({
                        fulfillmentText: `${ret}`
                    });

                });
            } else if (intentName === 'opcion-recuperacion-credenciales')
            {
                console.log(chalk.cyan(`\n==> INTENT [${intentName}] `));
                var cedula = JSON.stringify(req.body.queryResult.parameters.number);
                base.credenciales(cedula).then((ret) =>
                {
                    //HAGO ESTA VALIDACION POR QUE CUANDO SE REALIZA LA CONSULTA A LA BASE Y NO SE TRAE NADA POR QUE 
                    //NO EXISTE INFORMACION PARA LA CEDULA, RETORNA UN MENSAJE DEIRECTAMENTE QUE INICIA CON 'No',
                    //ENTONCES ME VALCO DE ESTO PROVISIONALMENTE PARA VALIDARLO
                    console.log('================================***** ' + ret.substring(0, 2).toUpperCase() != 'NO');
                    if (ret.substring(0, 2).toUpperCase() != 'NO')
                    {
                        console.log(ret);
                        mail.enviarMail('ASUNTO: RECUPERACION', ret, 'darwincabezash@gmail.com').then((ret1) =>
                        { });
                    }
                });
                console.log(chalk.yellow(`\n==> ENVIANDO RESPUESTA horario Listo, intentaremos enviar la información de tus credenciales de acceso al correo registrado en nuestro sistema. \n\n Cédula ingresada: 0${cedula}`));
                return res.send({
                    fulfillmentText: `Listo, intentaremos enviar la información de tus credenciales de acceso al correo registrado en nuestro sistema. \n\n Cédula ingresada: 0${cedula}`
                });
            }
    });
});

// Start the server
webApp.listen(PORT, () =>
{
    console.log(`Server is up and running at ${PORT}`);

});



