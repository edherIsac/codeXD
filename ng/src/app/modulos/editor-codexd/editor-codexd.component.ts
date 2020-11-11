import { StaticSymbolResolver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { LexicoCodexdService } from '../lexico/lexico-codexd.service';
import { SintacticoCodexdService } from '../sintactico/sintactico-codexd.service';
import { SemanticoCodexdService } from '../semantico/semantico-codexd.service'

@Component({
  selector: 'app-editor-codexd',
  templateUrl: './editor-codexd.component.html',
  styleUrls: ['./editor-codexd.component.css'],
  providers: [LexicoCodexdService, SintacticoCodexdService, SemanticoCodexdService]
})
export class EditorCodexdComponent implements OnInit {

  codigoStr = 'int main(){int a; int b;}';

  constructor(
    private lexico: LexicoCodexdService,
    private sintactico: SintacticoCodexdService,
    private semantico: SemanticoCodexdService
  ) { }

  ngOnInit() {
  }

  analizar() {

    let analicisAlfabeto = true;

    for (const letra of this.codigoStr) {
      const alfabeto = this.lexico.inAlfabeto(letra);

      if (!alfabeto) {
        console.log('El simbolo ->' + letra + ' no pertenece al alfabeto');
        analicisAlfabeto = false;
        break;
      }
    }

    if (analicisAlfabeto) {
      const aservoAnalisis = this.lexico.optimizarCode(this.codigoStr);

      const simbolos = [];

      for (const obj of aservoAnalisis) {
        // console.log(obj);

        // Vamos a clasificar todas as palabras y simbolos del codigo
        // 1 -> Palabra reservada
        // 2 -> Simbolo
        // 3 -> Variable
        const toSimbolo = this.lexico.clasificacion(obj);
        simbolos.push(
          { palabra: obj, tipo: toSimbolo.tipo, simbolo: toSimbolo.simbolo }
        );
      }

      console.log(simbolos);

      this.sintactico.analizarSintaxis(simbolos);
      this.semantico.analisarSemantica(simbolos);

    }
  }

  optimizarCode() {
    const str: string = this.codigoStr;
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
        case '+':
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
