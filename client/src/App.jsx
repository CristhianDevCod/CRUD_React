
import { Typography } from '@mui/material';
import Grid2  from '@mui/material/Grid2/Grid2.js';
import Container from '@mui/material/Container';
import { useState } from 'react';
import Axios from 'axios'

import '@fontsource/roboto/500.css';

// Sweetalert2
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

import TablePersonas from './components/Table/TablePersonas';
import FormControlR from './components/Formulario/FormControl';

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
        html: <p>La persona a sido registrada {nombre}</p>,
        icon: 'success',
        timerProgressBar: true,
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
      setEmpleados(response.data)
      // console.log('Personas actualizadas')
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
        title: <strong>Actualizacion exitosa</strong>,
        html: <i>{nombre} a sido actualizada</i>,
        timerProgressBar: true,
        icon: 'warning',
        timer: 3000
      })
      get(); //llamar a actualizar
      cancel();
    });
  }

  //Delete
  const eliminarEmpleado = (id) => {
    MySwal.fire({
      title: <strong>¿Eliminar?</strong>,
      showDenyButton: true,
      icon: 'error',
      confirmButtonText: "Eliminar",
      denyButtonText: "Cancelar",
      confirmButtonColor: "#f44336",
      denyButtonColor: "#2196f3"
    }).then((result) => {
      if(result.isConfirmed){
        const Toast = Swal.mixin({
          position: "top-end",
          toast: true,
          timer: 3000,
          timerProgressBar: true,
          confirmButtonColor: "#2196f3",
          showConfirmButton: false
        })
        Toast.fire("El elemento se ha eliminado", "", "info");
        Axios.delete(`http://localhost:3001/delete/${id}`,)
          .then(()=>{
          //Mostrar mensaje
            get(); //Actualiza
          })
      } 
      return;
    })
    
  }

  //Se llama continuamente
  // get(); //Siempre que se inicialice aparezca la información

  return (
    <>
      <Container fixed>
      <Typography variant="h3" component="h3">
        Pruebas
      </Typography>

        {/* Formulario aquí */}
        <FormControlR 
          nombre={ nombre}
          setNombre={setNombre}
          edad ={edad}
          setEdad={setEdad}
          pais={pais}
          setPais={setPais}
          cargo={cargo}
          setCargo={setCargo}
          experiencia={experiencia}
          setExperiencia={setExperiencia}
          editar={editar}
          update={update}
          cancel={cancel}
          add={add}
          get={get}
        ></FormControlR>
      </Container>

      <Container fixed sx={{marginTop:'30px'}}>
        <Grid2 size={12}>
          {
            empleadosLista.length ? 
            <TablePersonas personas={empleadosLista} edit={edit} eliminarEmpleado={eliminarEmpleado} ></TablePersonas>
          :
            <Typography variant="h4" align='center' component="h3">
              No hay personas agregados
          </Typography>
          }
          
        </Grid2>
      </Container>
    </>
  )
}

export default App
