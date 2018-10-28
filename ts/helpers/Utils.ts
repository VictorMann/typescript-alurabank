import { Imprimivel } from '../models/imprimivel';

export function imprime (...objetos: Imprimivel[]) {
    objetos.forEach(objeto => objeto.paraTexto());
}