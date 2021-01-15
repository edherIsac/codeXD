import { Injectable } from '@angular/core';

@Injectable()
export class CodigoIntermedioCodexdService {

  preCogigoIntr;
  constructor() {
    // this.preCogigoIntr = [
    //   ['a','=','5'],
    //   ['b','=','7'],
    //   ['c','=','a','+','b']
    // ]
    this.preCogigoIntr = [];
  }

  generarCodigoIntermedio(arrAserv) {
    // console.log(arrAserv);
    let bandera1 = 0;
    let bandera2 = 0;
    let sentensias = [];

    this.preCogigoIntr = [];

    // Extraccion de operaciones del codigo

    for (let i = 0; i < arrAserv.length; i++) {

      if (arrAserv[i].simbolo === '}') {
        bandera2 = 0;
      }

      if (bandera2 === 1) {
        if (arrAserv[i].simbolo === ';' && sentensias.length > 0) {
          this.preCogigoIntr.push(sentensias);
          sentensias = [];
          bandera1 = 0;
        }
        if (arrAserv[i].simbolo === 'v' && arrAserv[i + 1].simbolo === '=') {
          bandera1 = 1;
        }
        if (bandera1 === 1) {
          sentensias.push(arrAserv[i].palabra);
        }

        // if (arrAserv[i].simbolo === '&' && arrAserv[i + 1].simbolo === '=') {
        //   bandera1 = 1;
        // }

      }

      if (arrAserv[i].simbolo === '{') {
        bandera2 = 1;
      }

    }


    // console.log(this.preCogigoIntr);

    // Almacenamos los cuadruplos que resulten en un array
    const codigoIntermedio = [];

    // Recorremos cada linea de operaciones
    for (const operacion of this.preCogigoIntr) {

      // Enviamos una linea de operaciones para obtener 1 o mas
      // cuadruplos resultantes
      const cuadruplos = this.nuevoCuadruple(operacion);

      // Agregamos los cuadruples a el array de codigo intermedio final
      for (const cuadruplo of cuadruplos) {
        codigoIntermedio.push(cuadruplo);
      }
    }
    console.log('Codigo Intermedio');
    for (const cuadruplo of codigoIntermedio) {
      let linea = '';
      for (const item of cuadruplo) {
        linea += item + '  ';
      }
      console.log(linea);
    }
    return codigoIntermedio;
  }


  nuevoCuadruple(operacion) {
    const resultado = [];

    // Determinamos si se usara el operador "=" en el cuadruplo
    if (operacion.length > 3) {
      // Si es mayor a 3, significa que tiene 2 o mas argumentos y 1 o mas operadores
      let cuadruplo = ['', '', '', ''];
      let item = '';
      let tmpOn = false;
      let contadorTmp = 1;

      // tslint:disable-next-line: prefer-for-of
      for (let i = 2; i < operacion.length; i++) {
        item = operacion[i];

        if (item === '*') {

          if (cuadruplo[2] === '') {
            cuadruplo[0] = item; // Operador "="
          } else {
            // ocupamos un temporal
            cuadruplo[3] = 't' + contadorTmp; // Resultado
            tmpOn = true;
            resultado.push(cuadruplo);

            cuadruplo = ['', '', '', ''];
            cuadruplo[0] = item; // Operador "="
          }
        } else {
          if (cuadruplo[1] === '') {

            if (tmpOn) {
              cuadruplo[1] = 't' + contadorTmp; // Argumento 1
              tmpOn = false;
              contadorTmp++;
              cuadruplo[2] = item; // Argumento 2
            } else {
              cuadruplo[1] = item; // Argumento 1
            }

          } else {

            cuadruplo[2] = item; // Argumento 2

          }
        }

      }

      cuadruplo[3] = operacion[0]; // Resultado
      resultado.push(cuadruplo);
    } else {
      // Si es menor a 4, significa que solo tiene 1 argumento
      const cuadruplo = ['', '', '', ''];

      cuadruplo[0] = operacion[1]; // Operador "="
      cuadruplo[1] = operacion[2]; // Argumento 1
      cuadruplo[2] = ' ';          // Argumento 2
      cuadruplo[3] = operacion[0]; // Resultado

      resultado.push(cuadruplo);
    }

    // console.log(resultado);


    return resultado;
  }
}


