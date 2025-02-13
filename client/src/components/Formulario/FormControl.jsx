import FormControl from '@mui/material/FormControl';
import { TextField } from '@mui/material';
import Button from '@mui/material/Button';
import Grid2  from '@mui/material/Grid2/Grid2.js';
import PropTypes from 'prop-types';

function FormControlR({nombre, setNombre, edad, setEdad, pais, setPais, cargo, setCargo, experiencia, setExperiencia, editar, update, cancel, add, get}) {
    return (
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
    )
}

FormControlR.propTypes = {
    nombre: PropTypes.string.isRequired,
    setNombre: PropTypes.func.isRequired,
    edad: PropTypes.number.isRequired,
    setEdad: PropTypes.func.isRequired,
    pais: PropTypes.string.isRequired,
    setPais: PropTypes.func.isRequired,
    cargo: PropTypes.string.isRequired,
    setCargo: PropTypes.func.isRequired,
    experiencia: PropTypes.number.isRequired,
    setExperiencia: PropTypes.func.isRequired,
    editar: PropTypes.bool.isRequired,
    update: PropTypes.func.isRequired,
    cancel: PropTypes.func.isRequired,
    get: PropTypes.func.isRequired,
    add: PropTypes.func.isRequired
}

export default FormControlR;