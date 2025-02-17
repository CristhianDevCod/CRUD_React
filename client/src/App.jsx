
import { Typography } from '@mui/material';
import Grid2  from '@mui/material/Grid2/Grid2.js';
import Container from '@mui/material/Container';
import { useEffect } from 'react';
import '@fontsource/roboto/500.css';
import useEmpleados from './hooks/useEmpleados';
import TablePersonas from './components/Table/TablePersonas';
import FormControlR from './components/Formulario/FormControl';


function App() {
  const {add,cancel,cargo,edad,edit,editar,eliminarEmpleado,empleadosLista,experiencia,get,id,nombre,pais,setCargo,setEdad,setExperiencia,setNombre,setPais,update} = useEmpleados();

  useEffect(() => {
    get(); //Carga incial de empleados
  }, []);

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
