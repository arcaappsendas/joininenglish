const mysql = require('mysql2');

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

    getData: async function (cedula)
    {
        let query = 'SELECT * FROM alumno where cedula=' + cedula;
        const [results] = await connection.query(query);
        connection.end();
        console.log(results);
        return results;
    }
    ,
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

        //console.log(results.length);

        //console.log(JSON.parse(JSON.stringify(results[0].horarios)));
        //console.log('******************>' + JSON.stringify(results[0]));
        //console.log('------------------>' + JSON.parse(JSON.stringify(results[0])));
        //console.log('xxxxxxxxxxxxxxxxxx>' + JSON.parse(JSON.stringify(results[0].horarios)));

        connection.end();
        //console.log(results);

        //let respuesta = JSON.parse(JSON.stringify(results[0].horarios))
        //console.log('@@@@: ' + respuesta);

        if (results.length > 0)
        {

            //let respuesta = JSON.parse(JSON.stringify(results[0].horarios))
            //console.log('@@@@: ' + JSON.parse(JSON.stringify(results[0].horarios)));

            respuestaHorarios = JSON.parse(JSON.stringify(results[0].horarios)).toString()
            nombre = results[0].nombres.split(' ')[0];
            return `Listo ${nombre}, tus horarios son: \n\n 
                    ${respuestaHorarios} \n
                    Espero haberte ayudado.\n 
                    Hasta pronto. 😌`;
            //res.json(results.horarios);
        }
        else
        {
            //console.log('no trae resultado');
            return 'No se encontró información para el número de cédula ingresado 🫤';
            //res.json('No se encontró información para el número de cédula ingresado');
        }
    }
}