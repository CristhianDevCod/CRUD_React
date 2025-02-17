import { useState } from "react";
import Axios from "axios";
// Sweetalert2
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

const useEmpleados = () => {
    const [empleadosLista, setEmpleados] = useState([])
    const [editar, setEditar] = useState(false)
    const [id, setId] = useState(0);
    const [nombre, setNombre] = useState('');
    const [edad, setEdad] = useState(0);
    const [pais, setPais] = useState('');
    const [cargo, setCargo] = useState('');
    const [experiencia, setExperiencia] = useState(0);


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
    const add = async (event) => {
        event.preventDefault();
        try {
            await Axios.post("http://localhost:3001/create", {
                nombre, edad, pais, cargo, experiencia,
            });
            await get();
            cancel();
            //Mostrar mensaje
            MySwal.fire({
                title: <strong>Registo exitoso</strong>,
                html: <p>La persona a sido registrada {nombre}</p>,
                icon: 'success',
                timerProgressBar: true,
                timer: 3000
            });
        } catch (error) {
            MySwal.fire({
                title: <strong>Error al agregar</strong>,
                html: <p>No se pudo agregar a {nombre}</p>,
                icon: 'error',
                timerProgressBar: true,
                timer: 3000
            });
        }
    }

    //Read
    const get = async () => {
        try {
            const response = await Axios.get("http://localhost:3001/empleados");
            setEmpleados(response.data);
        } catch (error){
            MySwal.fire({
                title: <strong>Error al cargar empleados</strong>,
                html: <p>No se pudo cargar los empleados</p>,
                icon: 'error'
            })
        }
    }

    //Update
    const update = async () => {
        try {
            await Axios.put("http://localhost:3001/update",{
                id:id, 
                nombre:nombre, 
                edad:edad, 
                pais:pais, 
                cargo:cargo, 
                experiencia:experiencia
                });
            await get();
            cancel();
            //Mostrar mensaje
            MySwal.fire({
                title: <strong>Actualizacion exitosa</strong>,
                html: <i>{nombre} a sido actualizada</i>,
                timerProgressBar: true,
                icon: 'warning',
                timer: 3000
            });
        } catch (erro){
            //Mostrar mensaje
            MySwal.fire({
                title: <strong>Error al actualizar</strong>,
                html: <i>No se pudo actualizar a {nombre}</i>,
                timerProgressBar: true,
                icon: 'warning',
                timer: 3000
            });
        }
    }

    //Delete
    const eliminarEmpleado = async (id) => {
        const result = await MySwal.fire({
                title: <strong>¿Eliminar?</strong>,
                showDenyButton: true,
                icon: 'error',
                confirmButtonText: "Eliminar",
                denyButtonText: "Cancelar",
                confirmButtonColor: "#f44336",
                denyButtonColor: "#2196f3"
            });
        
        if(result.isConfirmed){
            try {
                await Axios.delete(`http://localhost:3001/delete/${id}`);
                await get();
                const Toast = Swal.mixin({
                    position: "top-end",
                    toast: true,
                    timer: 3000,
                    timerProgressBar: true,
                    confirmButtonColor: "#2196f3",
                    showConfirmButton: false
                });
                Toast.fire("El elemento se ha eliminado", "", "info");
            } catch (error){
                const Toast = Swal.mixin({
                    position: "top-end",
                    toast: true,
                    // timer: 3000,
                    // timerProgressBar: true,
                    confirmButtonColor: "#2196f3",
                    showConfirmButton: false
                });
                Toast.fire("No se ha podido eliminar", "", "error");
            }
        } 
    }

    return {
        empleadosLista,
        editar,
        id,
        nombre,
        edad,
        pais,
        cargo,
        experiencia,
        setNombre,
        setEdad,
        setPais,
        setCargo,
        setExperiencia,
        add,
        get,
        update,
        eliminarEmpleado,
        edit,
        cancel,
    };
};

export default useEmpleados;