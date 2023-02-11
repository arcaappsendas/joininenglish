const mysql = require('mysql2');
const chalk = require("chalk");

const connection = mysql.createConnection({
    database: 'webhook',
    user: '449uekelvcy7mzlcngvd',
    host: 'us-east.connect.psdb.cloud',
    password: 'pscale_pw_dpShu1DLu8su2KRcTIBTRT82MhOK4RBCHtw9WNDSjYv',
    ssl: {
        rejectUnauthorized: false
    }
});

module.exports = {
    horario: async function (cedula)
    {
        const connection = await mysql.createConnection({
            database: 'webhook',
            user: '449uekelvcy7mzlcngvd',
            host: 'us-east.connect.psdb.cloud',
            password: 'pscale_pw_dpShu1DLu8su2KRcTIBTRT82MhOK4RBCHtw9WNDSjYv',
            ssl: {
                rejectUnauthorized: false
            },
        });

        let query = `SELECT * FROM alumno where cedula=${cedula}`;

        const [results] = await connection.promise().query(query);
        connection.end();

        if (results.length > 0)
        {

            respuestaHorarios = JSON.parse(JSON.stringify(results[0].horarios)).toString()
            nombreEstudiante = results[0].nombres.split(' ')[0];
            console.log(chalk.green(`\n==> CONSULTA USUARIO:  ${nombreEstudiante} `));
            return `Listo ${nombreEstudiante}, tus horarios son: \n\n ${respuestaHorarios}. \n\n Espero haberte ayudado.\n Hasta pronto. 😌`;
        }
        else
        {
            return 'No se encontró información para el número de cédula ingresado 🫤';
        }
    },
    pago: async function (cedula)
    {
        const connection = await mysql.createConnection({
            database: 'webhook',
            user: '449uekelvcy7mzlcngvd',
            host: 'us-east.connect.psdb.cloud',
            password: 'pscale_pw_dpShu1DLu8su2KRcTIBTRT82MhOK4RBCHtw9WNDSjYv',
            ssl: {
                rejectUnauthorized: false
            },
        });

        let query = `SELECT * FROM alumno where cedula=${cedula}`;

        const [results] = await connection.promise().query(query);
        connection.end();

        try
        {
            if (results.length > 0)
            {
                let nombreEstudiante = results[0].nombres.split(' ')[0];
                console.log(chalk.green(`\n==> CONSULTA USUARIO:  ${nombreEstudiante} `));
                let dia_pago = results[0].dia_pago;
                let estado_pago = results[0].estado_pago;
                let valor_pago = results[0].valor_pago;
                return `Listo ${nombreEstudiante}, a continuación te comparto la información de pagos: \n\n Los pagos debes realizarlos el día ${dia_pago} de cada mes, \n el valor total por mes, es de $${valor_pago}; \n tu estado actual de pagos es "${estado_pago}". \n\n Espero haberte ayudado.\n Hasta pronto. 😌`;
            }
            else
            {
                return 'No se encontró información para el número de cédula ingresado 🫤';
            }
        } catch (e)
        {
            console.log(chalk.red(`\n==> ERROR:  No se encontró información para el número de cédula ingresado 🫤  ${e}   `));
            return 'No se encontró información para el número de cédula ingresado 🫤';
        }
    },
    credenciales: async function (cedula)
    {
        const connection = await mysql.createConnection({
            database: 'webhook',
            user: '449uekelvcy7mzlcngvd',
            host: 'us-east.connect.psdb.cloud',
            password: 'pscale_pw_dpShu1DLu8su2KRcTIBTRT82MhOK4RBCHtw9WNDSjYv',
            ssl: {
                rejectUnauthorized: false
            },
        });

        let query = `SELECT * FROM alumno where cedula=${cedula}`;

        const [results] = await connection.promise().query(query);
        connection.end();

        if (results.length > 0)
        {
            nombreEstudiante = results[0].nombres.split(' ')[0];
            console.log(chalk.green(`\n==> CONSULTA USUARIO:  ${nombreEstudiante} `));
            usuario = results[0].usuario;
            contrasenia = results[0].contrasenia;

            return `Listo ${nombreEstudiante}, tus credenciales de acceso a la plataforma son: \n\n USUARIO: ${usuario} \n CONTRASEÑA: ${contrasenia} \n\n Espero haberte ayudado.\n Hasta pronto. 😌`;
        }
        else
        {
            return 'No se encontró información para el número de cédula ingresado 🫤';
        }
    }
}