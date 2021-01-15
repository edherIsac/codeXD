import { Injectable } from '@angular/core';

@Injectable()
export class SintacticoCodexdService {

  tblSintaxis: Array<any>;
  simbolos;
  estado = 1;

  constructor() {

    this.simbolos = '&#(){}vn;*=';

    this.tblSintaxis = [];
    this.tblSintaxis.push([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]); // 0

    this.tblSintaxis.push([2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]); // 1
    this.tblSintaxis.push([0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0]); // 2
    this.tblSintaxis.push([0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0]); // 3
    this.tblSintaxis.push([0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0]); // 4
    this.tblSintaxis.push([0, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0]); // 5
    this.tblSintaxis.push([7, 0, 0, 0, 0, 0, 14, 0, 0, 0, 0]); // 6
    this.tblSintaxis.push([0, 0, 0, 0, 0, 0, 8, 0, 0, 0, 0]); // 7
    this.tblSintaxis.push([0, 0, 0, 0, 0, 0, 0, 0, 12, 0, 9]); // 8
    this.tblSintaxis.push([0, 0, 0, 0, 0, 0, 10, 10, 0, 0, 0]); // 9
    this.tblSintaxis.push([0, 0, 0, 0, 0, 0, 0, 0, 12, 11, 0]); // 10
    this.tblSintaxis.push([0, 0, 0, 0, 0, 0, 10, 10, 0, 0, 0]); // 11
    this.tblSintaxis.push([7, 0, 0, 0, 0, 13, 14, 0, 0, 0, 0]); // 12
    this.tblSintaxis.push([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]); // 13 estado aceptacion
    this.tblSintaxis.push([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9]); // 14
  }

  analizarSintaxis(arrAservo) {
    this.estado = 1;
    let error = false;

    // Recorremos el codigo optimizado para validar su sintaxis
    for (const letra of arrAservo) {
      const estado = this.nextStatus(letra.simbolo);
      // console.log(letra.simbolo + ' -> ' + estado);

      if ( estado === 0) {
        error = true;
        break;
      }
    }

    if (error) {
      console.log('Error de sintaxis');
      return false;
    } else {
      console.log('Codigo sin errores sintacticos');
      return true;
    }
  }

  nextStatus(entrada) {
    // Obtenemos la columna segun la entrada
    const indexEntrada = this.simbolos.indexOf(entrada);
    try {


      this.estado = this.tblSintaxis[this.estado][indexEntrada];

      return this.estado;
    } catch (error) {
      console.log(indexEntrada);

      return 0;
    }


  }


  public get getEstado() {
    return this.estado;
  }


}
