import { Injectable } from '@angular/core';

@Injectable()
export class SemanticoCodexdService {

variables;

constructor() {
  this.variables = [
    {
      palabra: '',
      tipo: 0,
      simbolo: ''
    }
  ];
}

  analisarSemantica(arrAserv){
    for(let i = 0; i < arrAserv.length;i++){

    }
  }
}


