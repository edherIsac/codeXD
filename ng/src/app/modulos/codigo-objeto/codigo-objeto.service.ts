import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CodigoObjetoService {


constructor() { }
  generarCodigoObjeto(codigoIntermedio){
    let Codigo = '.model small\n'+
    '.stack\n'+
    '.data\n'+
    '    n1 db '+codigoIntermedio[0][1]+'\n'+
    '    n2 db '+codigoIntermedio[1][1]+'\n'+
    '    r db 0\n'+
    '.code\n'+
    'main proc\n'+
    '    mov ax, seg @data\n'+
    '    mov ds,ax\n'+

    '    mov al, n1\n'+
    '    mov bl, n2\n'+
    '    mul bl\n'+

    '    mov r, al\n'+

    '    mov al, r\n'+
    '    AAM\n'+
    '    mov bx, ax\n'+
    '    mov ah, 02h\n'+
    '    mov dl, bh\n'+
    '    add dl, 30h\n'+
    '    int 21h\n'+

    '    mov ah, 02h\n'+
    '    mov dl, bl\n'+
    '    add dl, 30h\n'+
    '    int 21h\n'+

  'main endp\n'+
  'end main\n'

    return  Codigo;
    // console.log('Codigo Objeto\n');
    // console.log('.model small\n'+
    //       '.stack\n'+
    //       '.data\n'+
    //       '    n1 db '+codigoIntermedio[0][1]+'\n'+
    //       '    n2 db '+codigoIntermedio[1][1]+'\n'+
    //       '    r db 0\n'+
    //       '.code\n'+
    //       'main proc\n'+
    //       '    mov ax, seg @data\n'+
    //       '    mov ds,ax\n'+

    //       '    mov al, n1\n'+
    //       '    mov bl, n2\n'+
    //       '    mul bl\n'+

    //       '    mov r, al\n'+

    //       '    mov al, r\n'+
    //       '    AAM\n'+
    //       '    mov bx, ax\n'+
    //       '    mov ah, 02h\n'+
    //       '    mov dl, bh\n'+
    //       '    add dl, 30h\n'+
    //       '    int 21h\n'+

    //       '    mov ah, 02h\n'+
    //       '    mov dl, bl\n'+
    //       '    add dl, 30h\n'+
    //       '    int 21h\n'+

    //     'main endp\n'+
    //     'end main\n');
  }
}


