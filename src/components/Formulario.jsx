import React, { useState } from 'react'
import Error from './Error'
import uuid from 'uuid/v4'
import PropTypes from 'prop-types'

const Formulario = ({GuardarGasto, guardarCrearGasto}) => {

    const [nombre, guardarNombre] = useState('');
    const [ cantidad, guardarCantidad] = useState(0);
    const [ error, guardarError] = useState(false);
   
   
    const agregarGasto = e =>{
        e.preventDefault();
      
        

        // vaidar 
        if(cantidad < 1 || isNaN(cantidad) || nombre.trim() === ''){
            guardarError(true);
            return;
        }
        guardarError(false);
        
        // contruir Gasto
        const gasto = {
            nombre,
            cantidad,
            id: uuid()
        }

        
        //pasar el gasto al componente principal 

        GuardarGasto(gasto);
        guardarCrearGasto(true);

        // resetear el form
        guardarNombre('')
        guardarCantidad(0)


    }


    return ( 
        <form onSubmit={agregarGasto} >
            <h2>Agrega Tus gastos Aqui</h2>
            { error
                ? (<Error mensaje="Ambos campos son obligatorios o presupuesto 
                incorrecto" /> )

                : (null) 
            }

            <div className="campo">
                <label>Nombre Gasto</label>
                <input
                    type="text"
                    className="u-full-width"
                    placeholder="ej. Transporte"
                    value={nombre}
                    onChange={e => guardarNombre(e.target.value)}
                />
            </div>

            <div className="campo">
                <label>Cantidad Gasto</label>
                <input
                    type="number"
                    className="u-full-width"
                    placeholder="ej. 300"
                    value={cantidad}
                    onChange={e => guardarCantidad(parseInt(e.target.value, 10))}
                />
            </div>

            <input  
                value="Agregar Gasto"
                className="button-primary u-full-width"
                type="submit"
            />
        </form>
    );
}

Formulario.propTypes = {
    GuardarGasto : PropTypes.func.isRequired,
    guardarCrearGasto : PropTypes.func.isRequired

}

 
export default Formulario;