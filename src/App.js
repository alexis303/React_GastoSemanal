import React, {useState, useEffect} from 'react';
import Pregunta from './components/Pregunta';
import Formulario from './components/Formulario';
import Listado from './components/Listado';
import ControlPresupuesto from './components/ControlPresupuesto';

function App() {

  // definir State
  const [presupuesto, guardarPresupuesto] = useState(0);
  const [ restante, guardarRestante ] = useState(0);
  const [ mostrarPregunta, actualizarPregunta] = useState(true);
  const [ gastos, GuardarGastos] = useState([]);
  const [ gasto, GuardarGasto] = useState({});
  const [ crearGasto, guardarCrearGasto] = useState(false);


    // useEffect que actualiza el restante
    useEffect( () => {

      //agrega nuevo presupuesto
     if(crearGasto){
      GuardarGastos([
        
        ...gastos,
        gasto
        
      ]);

      //resta del presupuesto

      const presupuestoRestante = restante - gasto.cantidad; 
      guardarRestante(presupuestoRestante);

      // resetear a false 
      guardarCrearGasto(false);
     }
     
  
    }, [gasto,crearGasto,gastos,restante ]);
  
  //Cuando agreguemos un nuevo gasto 

  // const agregarNuevoGasto = gasto => {
  

  //   console.log(gastos)
  // }

  return (
    <div className="container">
      <header>
        <h1>Gasto semanal</h1>
        <div className="contenido-principal contenido">
          {mostrarPregunta 
          ? (<Pregunta
            guardarPresupuesto ={guardarPresupuesto}
            guardarRestante = {guardarRestante}
            actualizarPregunta = {actualizarPregunta}
            />) 
            
          : (
            <div className="row">
              <div className="one-half column">
                <Formulario 
                  GuardarGasto = {GuardarGasto}
                  guardarCrearGasto = {guardarCrearGasto}
                />

              </div>
              <div className="one-half column">
                
                <Listado
                  gastos={gastos}
                />

                <ControlPresupuesto
                presupuesto={presupuesto}
                restante ={restante}
                />

              </div>
            </div>
          )
          }
          
        </div>
      </header>
    </div>
    
  );
}

export default App;
