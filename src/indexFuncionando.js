const express = require('express');
require('dotenv').config();

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
console.log('conexion ok');
const webApp = express();
webApp.use(express.urlencoded({
    extended: true
}));
webApp.use(express.json());
const PORT = process.env.PORT;









// Home route
/*webApp.get('/', (req, res) =>
{
    res.send(`Hello World.!`);
});*/


//FUNCIONA EXELENTE
webApp.post('/requestX', (req, res) =>
{
    var json = JSON.parse(JSON.stringify(req.body));

    console.log(json.queryResult.queryText);

    res.send({
        fulfillmentText: 'Hello from the other side.'
    });
});



//req=cedula
webApp.post('/request', (req, res) =>
{
    console.log(req.body);
    
    console.log('*********************  QUERY RESULT   *******');
    console.log(req.body.queryResult);
    console.log('*********************  OUTPUTS CONTEXT   *******');
    console.log(req.body.queryResult.outputContexts);
    console.log('*********************  FIN   *******');

    //necesita consultar el horario
    if(req.body.queryResult.intent.displayName=='opcion-horario'){
            // antes falta pedir la cedula
            console.log('=============>' + req.body.queryResult.intent.displayName);
    }
    /*
    var cedula =JSON.parse(JSON.stringify(req.body)).queryResult.queryText;
    let query='SELECT * FROM alumno where cedula='+cedula;

    let nombre;

    connection.query(
        query,
        function(err, results, fields) {
            nombre= results[0].nombres;
            console.log(nombre); 
            //console.log(results[0].nombres); 
        }
      );
    */
    res.send({
        fulfillmentText: 'Tu cedula es : '//+cedula
    });
});










































// Start the server
webApp.listen(PORT, () =>
{
    console.log(`Server is up and running at ${PORT}`);
});






/*

// simple query
connection.query(
    'SELECT * FROM alumno',
    function(err, results, fields) {
      console.log(results); 
      console.log(results.length); 
    }
  );

  */