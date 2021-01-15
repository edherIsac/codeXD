import { Injectable } from '@angular/core';

@Injectable()
export class LexicoCodexdService {

  private palabrasReservadas;
  private alfabeto;
  private simbolos;

  constructor() {

    // Primero bucaremos que todos los caracteres pertenescan a nuetro aservo
    this.alfabeto = 'abcdefghijklmnopqrstuvwxyz1234567890{}();=* ';
    this.simbolos = '*{}();=';

    this.palabrasReservadas = [
      {
        id: 1, palabra: 'inic', simbolo: '#'
      },
      {
        id: 2, palabra: 'int', simbolo: '&'
      }
    ];

  }

  inAlfabeto(letra) {

    if (letra.charCodeAt(0) === 10) {
      return true;
    } else {
      const res = this.alfabeto.indexOf(letra);

      return res > -1 ? true : false;
    }
  }

  clasificacion(palabra) {

    // const isReservada = this.palabrasReservadas.find(item => item.palabra === palabra) > -1 ? true : false;
    let isReservada = false;
    let s = '@';

    for (const item of this.palabrasReservadas) {

      if (item.palabra === palabra) {
        isReservada = true;
        s = item.simbolo;
      }

    }


    if (isReservada) {
      return {tipo: 1, simbolo: s };
    } else {
      const isSimbolo = this.simbolos.indexOf(palabra) > -1 ? true : false;

      if (isSimbolo) {
        return {tipo: 2, simbolo: palabra};
      } else {
        // Variables o numeros (v o n)
        const str = this.esNumero(palabra) ? 'n' : 'v';
        return {tipo: 3, simbolo: str};
      }

    }

  }

  // Comprobamos si es un numero el caracter entrante
  esNumero(str) {
    const regInteger = /^\d+$/;
    return regInteger.test(str);
  }


  optimizarCode(str) {
    // const str: string = this.codigoStr;
    let strObj = '';

    for (const letra of str) {

      switch (letra) {
        case '(':
          strObj += ' ' + letra;
          break;
        case ')':
          strObj += ' ' + letra;
          break;
        case '{':
          strObj += ' ' + letra + ' ';
          break;

        case '}':
          strObj += ' ' + letra;
          break;
        case ';':
          strObj += ' ' + letra + ' ';
          break;
        case '=':
          strObj += ' ' + letra + ' ';
          break;
        case '*':
          strObj += ' ' + letra + ' ';
          break;

        default:
          strObj += letra;
          break;
      }

    }

    const arrCodeTmp = strObj.split(' ');
    const arrCode = [];

    // Limpiamos el array de los indices con cadena vacia
    for (const item of arrCodeTmp) {
      if (item !== '' && item.charCodeAt(0) !== 10) {
        arrCode.push(item);
      }
    }

    return arrCode;

  }

}
