const { Intercepto } = require("../db");
const { spawn } = require('child_process');


const calcularCoeficientes =  () => {
    const pythonScript = spawn('python', ['./src/python/script.py']);
  
    let coeficientes = {};
  
    pythonScript.stdout.on('data', (data) => {
      const resultado = data.toString();
      const lineas = resultado.split("\r\n");
  
      for (let i = 0; i < lineas.length; i++) {
        const linea = lineas[i];
  
        if (linea.startsWith("Variable:")) {
          const variable = linea.match(/Variable: (.+), Coeficiente: (.+)/);
          if (variable && variable.length === 3) {
            const variableNombre = variable[1];
            const variableCoeficiente = variable[2];
            coeficientes[variableNombre] = parseFloat(variableCoeficiente);
          }
        }
      }
  
      console.log(coeficientes);
    });
  
    // Capturar los errores del script de Python
    pythonScript.on('error', (err) => {
      console.error(err);
      console.log('Error en el cálculo del precio');
    });
  
    // Cuando el script de Python termina de ejecutarse
    pythonScript.on('close', (code) => {
      if (code === 0) {
        Intercepto.create(coeficientes)
          .then(() => {
            console.log('Coeficientes guardados en la base de datos:', coeficientes);
          })
          .catch((error) => {
            console.error('Error al guardar los coeficientes en la base de datos:', error);
            console.log('Error al guardar los coeficientes en la base de datos');
          });
      } else {
        console.log('Error en el cálculo del precio 1');
      }
    });
  };

  module.exports = calcularCoeficientes;
