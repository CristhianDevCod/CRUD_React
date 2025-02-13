
const express = require("express");
const app = express();
const mysql = require('mysql');
const cors = require('cors')

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: "empleados_crud"
});//Creacion de una conecion 

//Create
app.post("/create", (req, res) => {
    const nombre = req.body.nombre;
    const edad = req.body.edad;
    const pais = req.body.pais;
    const cargo = req.body.cargo;
    const experiencia = req.body.experiencia;

    db.query('INSERT INTO empleados (nombre, edad, pais, cargo, experiencia) VALUES (?, ?, ?, ?, ?);', [nombre, edad, pais, cargo, experiencia], (err, result)=>{
        if(err){
            console.log(err)
        } else {
            res.send("Empleado registrado")
        }
    })
});

//Read
app.get("/empleados", (req, res) => {
    db.query('SELECT * FROM empleados', (err, result)=>{
        if(err){
            console.log(err)
        } else {
            res.send(result)
        }
    })
});

//Update
app.put("/update", (req, res) => {
    const id = req.body.id;
    const nombre = req.body.nombre;
    const edad = req.body.edad;
    const pais = req.body.pais;
    const cargo = req.body.cargo;
    const experiencia = req.body.experiencia;

    db.query('UPDATE empleados SET nombre=?, edad=?, pais=?, cargo=?, experiencia=? WHERE id=?;', 
        [nombre, edad, pais, cargo, experiencia], 
        (err, result)=>{
        if(err){
            console.log(err)
        } else {
            res.send("Empleado actualizado con exito")
        }
    })
});

app.listen(3001, ()=>{
    console.log("Corriendo en el puerto 3001")
})