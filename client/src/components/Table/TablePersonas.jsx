import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell, {tableCellClasses} from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

function TablePersonas({personas, edit, eliminarEmpleado}){
    return(
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
                {personas.map((persona) => (
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
    )
}

TablePersonas.propTypes = {
  personas: PropTypes.array.isRequired,
  edit: PropTypes.func.isRequired,
  eliminarEmpleado: PropTypes.func.isRequired
}

export default TablePersonas;