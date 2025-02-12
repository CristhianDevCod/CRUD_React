import FormControl from '@mui/material/FormControl';
import { TextField } from '@mui/material';
import Grid2  from '@mui/material/Grid2/Grid2.js';
import Container from '@mui/material/Container';

function App() {

  return (
    <>
      <Container fixed>
        <h1>Pruebas</h1>
        <FormControl>
          <Grid2 container spacing={4}>
            <Grid2 size={6}>
              <TextField id="nombre" label="Nombre" variant="outlined" />
            </Grid2>
            <Grid2 size={6}>
              <TextField id="edad" label="Edad" variant="outlined" />
            </Grid2>
          </Grid2>
        </FormControl>
      </Container>
    </>
  )
}

export default App
