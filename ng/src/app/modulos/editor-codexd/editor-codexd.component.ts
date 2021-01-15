import { StaticSymbolResolver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { LexicoCodexdService } from '../lexico/lexico-codexd.service';
import { SintacticoCodexdService } from '../sintactico/sintactico-codexd.service';
import { SemanticoCodexdService } from '../semantico/semantico-codexd.service'
import { CodigoIntermedioCodexdService } from '../Codigo-Intermedio/codigoIntermedio-codexd.service';
import { CodigoObjetoService } from '../codigo-objeto/codigo-objeto.service';

@Component({
  selector: 'app-editor-codexd',
  templateUrl: './editor-codexd.component.html',
  styleUrls: ['./editor-codexd.component.css'],
  providers: [LexicoCodexdService, SintacticoCodexdService, SemanticoCodexdService, CodigoIntermedioCodexdService]
})
export class EditorCodexdComponent implements OnInit {

  resultado
  codigoStr = 'int inic(){\n'+'   int a=2;\n'+'   int b=3;\n'+'   int c=a*b;\n'+'  }'

  constructor(
    private lexico: LexicoCodexdService,
    private sintactico: SintacticoCodexdService,
    private semantico: SemanticoCodexdService,
    private codigoIntermedio: CodigoIntermedioCodexdService,
    private codigoObjeto: CodigoObjetoService
  ) { }

  ngOnInit() {
    this.resultado='';
  }

  analizar() {

    let analicisAlfabeto = true;

    for (const letra of this.codigoStr) {
      const alfabeto = this.lexico.inAlfabeto(letra);

      if (!alfabeto) {
        this.resultado ='El simbolo ->' + letra + ' no pertenece al alfabeto';
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

      // console.log(simbolos);

      if(this.sintactico.analizarSintaxis(simbolos)){
        if(this.semantico.analisarSemantica(simbolos)){
          const codigoInter = this.codigoIntermedio.generarCodigoIntermedio(simbolos);
          this.resultado = this.codigoObjeto.generarCodigoObjeto(codigoInter);
        }else{
          this.resultado = 'Error Semantico';
        }
      }else{
        this.resultado = 'Error sintactico';
      };

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
