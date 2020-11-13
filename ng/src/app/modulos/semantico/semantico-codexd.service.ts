import { Injectable } from '@angular/core';

@Injectable()
export class SemanticoCodexdService {

variables;

constructor() {
  this.variables = [];
}

  analisarSemantica(arrAserv){
    this.variables = [];
    let error = false;
    let error2 = false;
    for(let i = 0; i < arrAserv.length;i++){
      if(arrAserv[i].simbolo === '&'){
        if(arrAserv[i+1].simbolo === 'v'){
          const indexEntrada = this.variables.indexOf(arrAserv[i+1].palabra);
          if(indexEntrada >= 0){
            error = true;
          }else{
            this.variables.push(arrAserv[i+1].palabra);
          }
        }
      }
      else{

        if(arrAserv[i].simbolo === 'v'){
          if(arrAserv[i+1].simbolo === '='){
            // console.log(arrAserv[i]);
            // console.log(this.variables);
            const indexEntrada = this.variables.indexOf(arrAserv[i].palabra);
            // console.log(indexEntrada);
            if(indexEntrada === -1){
              error2 = true;
            }
          }
        }
      }

    }
    if(error === true){
      console.log('Error semantico duplicacion de variables');
    }else if(error2 === true){
      console.log('Error semantico estas utilizando una variable que no esta declarada');
    }else{
      console.log('Codigo sin errores semanticos');
    }
  }
}


