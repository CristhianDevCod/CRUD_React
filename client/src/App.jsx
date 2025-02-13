import FormControl from '@mui/material/FormControl';
import { TextField, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import Grid2  from '@mui/material/Grid2/Grid2.js';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { useState } from 'react';
import Axios from 'axios'

import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell, {tableCellClasses} from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import Paper from '@mui/material/Paper';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

// -----------------
import '@fontsource/roboto/500.css';

// Sweetalert2
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

function App() {
  const [id, setId] = useState(0);
  const [nombre, setNombre] = useState('');
  const [edad, setEdad] = useState(0);
  const [pais, setPais] = useState('');
  const [cargo, setCargo] = useState('');
  const [experiencia, setExperiencia] = useState(0);

  const [editar, setEditar] = useState(false)
  const [empleadosLista, setEmpleados] = useState([])

  const edit = (val) => {
    setEditar(true);
    setNombre(val.nombre);
    setEdad(val.edad);
    setPais(val.pais);
    setCargo(val.cargo);
    setExperiencia(val.experiencia);
    setId(val.id);
  }

  const cancel = () => {
    setEditar(false);
    setNombre('');
    setEdad('');
    setPais('');
    setCargo('');
    setExperiencia('');
    // setId(null);
  }

  //Create
  const add = (event) => {
    event.preventDefault()
    Axios.post("http://localhost:3001/create",{
      nombre:nombre, edad:edad, pais:pais, cargo:cargo, experiencia:experiencia
    }).then(()=>{
      //Mostrar mensaje
      MySwal.fire({
        title: <strong>Registo exitoso</strong>,
        html: <i>La persona a sido registrada {nombre}</i>,
        icon: 'success',
        timer: 3000
      })
      get(); //llamar a actualizar
      //limpiar campos
      cancel();
    });
  }

  //Read
  const get = () => {
    Axios.get("http://localhost:3001/empleados",).then((response)=>{
      setEmpleados(response.data),
      console.log('Personas actualizadas')
    });
  }

  //Update
  const update = () => {
    Axios.put("http://localhost:3001/update",{
      id:id, 
      nombre:nombre, 
      edad:edad, 
      pais:pais, 
      cargo:cargo, 
      experiencia:experiencia
    }).then(()=>{
      //Mostrar mensaje
      MySwal.fire({
        title: <strong>Registo exitoso</strong>,
        html: <i>{nombre} a sido actualizada</i>,
        icon: 'warning',
        timer: 3000
      })
      get(); //llamar a actualizar
      cancel();
    });
  }

  //Delete
  const eliminarEmpleado = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`,)
      .then(()=>{
        //Mostrar mensaje
      MySwal.fire({
        title: <strong>Eliminacion exitosa</strong>,
        html: <i>{nombre} a sido eliminado</i>,
        icon: 'error'
      })
        get(); //Actualiza
    })
  }

  //Se llama continuamente
  // get(); //Siempre que se inicialice aparezca la información

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  return (
    <>
      <Container fixed>
      <Typography variant="h3" component="h3">
        Pruebas
      </Typography>

        <FormControl>
          <Grid2 container spacing={4}>
            <Grid2 size={6}>
              <TextField 
                id="nombre"  
                label="Nombre" 
                variant="outlined" 
                value={nombre}
                onChange={(event) => (setNombre(event.target.value))}
              />
            </Grid2>

            <Grid2 size={6}>
              <TextField 
                id="edad"  
                label="Edad" 
                variant="outlined" 
                type='number'
                value={edad}
                onChange={(event) => (setEdad(event.target.value))}
              />
            </Grid2>

            <Grid2 size={6}>
            <TextField 
              id="pais"  
              label="Pais" 
              variant="outlined"
              value={pais} 
              onChange={(event) => (setPais(event.target.value))}
            />
            </Grid2>

            <Grid2 size={6}>
              <TextField 
                id="cargo"  
                label="Cargo" 
                variant="outlined" 
                value={cargo}
                onChange={(event) => (setCargo(event.target.value))}
              />
            </Grid2>

            <Grid2 size={12} container="true" direction="row" sx={{ justifyContent: "center", alignItems: "center"}}>
              <TextField 
                id="experiencia"  
                label="Experiencia" 
                variant="outlined" 
                type='number'
                value={experiencia}
                onChange={(event) => (setExperiencia(event.target.value))}
              />
            </Grid2>

            <Grid2 size={12} container="true" direction={"row"} sx={{justifyContent: "center", alignItems:"center"}}>
              {
                editar ?
                <Grid2>
                  <Button variant="contained" color='warning' onClick={update} type='submit'>Actualizar Persona</Button>
                  <Button sx={{marginLeft:'20px'}} variant="contained" color='error' onClick={cancel} type='submit'>Cancelar</Button>
                </Grid2>
                :<Button variant="contained" color='success' onClick={add} type='submit'>Agregar Persona</Button>
              }
              <Button 
                variant="contained"
                color='primary'
                onClick={get}
                type='submit'
              >Listar personas</Button>
            </Grid2>
          </Grid2>
        </FormControl>
      </Container>

      <Container fixed sx={{marginTop:'30px'}}>
        <Grid2 size={12}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Nombre</StyledTableCell>
                  <StyledTableCell>Edad</StyledTableCell>
                  <StyledTableCell>Pais</StyledTableCell>
                  <StyledTableCell>Cargo</StyledTableCell>
                  <StyledTableCell>Experiencia</StyledTableCell>
                  <StyledTableCell>Acciones</StyledTableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {empleadosLista.map((persona) => (
                  <TableRow
                    key={persona.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell component="th" scope="row">{ persona.nombre }</TableCell>
                    <TableCell>{persona.edad}</TableCell>
                    <TableCell>{persona.pais}</TableCell>
                    <TableCell>{persona.cargo}</TableCell>
                    <TableCell>{persona.experiencia}</TableCell>
                    <TableCell>
                      <Button 
                        variant="outlined" 
                        color='info' 
                        sx={{marginRight:'10px'}} 
                        startIcon={<EditIcon />} 
                        onClick={()=>{
                          edit(persona)
                        }}
                        >Editar</Button>

                      <Button variant="outlined" onClick={()=>(eliminarEmpleado(persona.id))} color='error' startIcon={<DeleteIcon />}>Eliminar</Button>
                    </TableCell>
                  </TableRow>))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid2>
      </Container>
    </>
  )
}

export default App
