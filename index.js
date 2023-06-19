const bodyParser = require('body-parser')
const express = require('express')
const mysql = require('mysql')
const cors = require('cors');


const app = express()

 app.use(function(req, res, next) {
     res.setHeader('Access-Control-Allow-Origin', '*')
     res.setHeader('Access-Control-Allow-Methods', '*')
     res.setHeader('Access-Control-Allow-Headers', '*')
     next()
 })

app.use(bodyParser.json())
app.use(cors());

const PUERTO = 3000

const conexion = mysql.createConnection({
    host: 'localhost',
    database: 'vobook',
    user: 'root',
    password: 'password'
})

app.listen(PUERTO, () => {
    console.log(`Servidor corriendo en el puerto: ${PUERTO}`)
})

conexion.connect(error => {
    if (error) throw error
    console.log('Conexion exitosa a la base de datos');
})

app.get('/', (req, res) => {
    res.send('API')
})

app.post('/login', (req, res) => {
    const { user, pass } = req.body;
    conexion.query('SELECT * FROM vobook.login WHERE usuario = ?',[user],
      (error, results) => {
        if (error) throw error;
        if (results.length === 0) {
          res.status(401).send({ message: 'nombre o contraseña' });
        } else {
            const user = results[0];
            console.log(user);
            if (pass === user.contra) {
              res.send({ message: 'Acceso' });
            } else {
              res.status(401).send({ message: 'Nombre o contraseña incorrecto' });
            }
        }
      }
    );
  });
  

