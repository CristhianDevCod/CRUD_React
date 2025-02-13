
const express = require("express");
const app = express();
const mysql = require('mysql2');
const cors = require('cors')

app.use(cors());
app.use(express.json());

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: "empleados_crud"
});//Creacion de una conecion 

connection.connect();

//Funcion para envolver las consultas en promesas
const queryAsync = (query, values) => {
    return new Promise((resolve, reject) => {
        connection.query(query, values, (err, result) => {
            if(err){
                reject(err);
            } else {
                resolve(result);
            }
        })
    })
}

//Create
app.post("/create", (req, res) => {
    const nombre = req.body.nombre;
    const edad = req.body.edad;
    const pais = req.body.pais;
    const cargo = req.body.cargo;
    const experiencia = req.body.experiencia;

    connection.query('INSERT INTO empleados (nombre, edad, pais, cargo, experiencia) VALUES (?, ?, ?, ?, ?);', [nombre, edad, pais, cargo, experiencia], (err, result)=>{
        if(err){
            console.log(err)
        } else {
            res.send("Empleado registrado")
        }
    })
});

//Read
//Se implementa mejoras con async/await y manejo adecuado de errors
app.get("/empleados", async (req, res) => {
    try {
        //Se ejecuta la consulta a la base de datos
        const result = await queryAsync('SELECT * FROM empleados');

        //Se reponde con los resultados y un código de estado 200
        res.status(200).json(result)
    } catch (err){
        //Si ocurre un error, se responde con un código de estado 500 y un mensaje de error
        console.error('Error al obtener empleados: ', err);
        res.status(500).json({message: 'Error en el servidor, intenta más tarde.'});
    }
});

//Update
app.put("/update", (req, res) => {
    const id = req.body.id;
    const nombre = req.body.nombre;
    const edad = req.body.edad;
    const pais = req.body.pais;
    const cargo = req.body.cargo;
    const experiencia = req.body.experiencia;

    connection.query('UPDATE empleados SET nombre=?, edad=?, pais=?, cargo=?, experiencia=? WHERE id=?;', 
        [nombre, edad, pais, cargo, experiencia, id], 
        (err, result)=>{
        if(err){
            console.log(err)
        } else {
            res.send(result)
        }
    })
});

//Delete
app.delete("/delete/:id", (req, res) => {
    const id = req.params.id;

    connection.query('DELETE FROM empleados WHERE id=?;',id, 
        (err, result)=>{
        if(err){
            console.log(err)
        } else {
            res.send(result)
        }
    })
});

app.listen(3001, ()=>{
    console.log("Corriendo en el puerto 3001")
})
