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

  generarCodigoIntermedio(arrAserv){
    // console.log(arrAserv);
    let bandera1 = 0;
    let bandera2 = 0;
    let sentensias = [];
    for(let i = 0;i<arrAserv.length;i++){

      if(arrAserv[i].simbolo === '}'){
        bandera2 = 0;
      }
      if(bandera2 === 1){
        if(arrAserv[i].simbolo === ';' && sentensias.length > 0){
          this.preCogigoIntr.push(sentensias);
          sentensias = [];
          bandera1 = 0;
        }
        if(arrAserv[i].simbolo === 'v' && arrAserv[i+1].simbolo === '='){
          bandera1 = 1;
        }
        if(bandera1 === 1){
          sentensias.push(arrAserv[i].palabra);
        }
        if(arrAserv[i].simbolo === '&' && arrAserv[i+1].simbolo === '='){
          bandera1 = 1;
        }

      }
      if(arrAserv[i].simbolo === '{'){
        bandera2 = 1
      }

    }
    console.log(this.preCogigoIntr);
  }
}


