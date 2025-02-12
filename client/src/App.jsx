import FormControl from '@mui/material/FormControl';
import { InputLabel, TextField } from '@mui/material';

function App() {

  return (
    <>
      <h1>Pruebas</h1>
      <FormControl>
        <TextField id="nombre" label="Nombre" variant="outlined" />
        <TextField id="nombre" label="Nombre" variant="outlined" />
      </FormControl>
    </>
  )
}

export default App
