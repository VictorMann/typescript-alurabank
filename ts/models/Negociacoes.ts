import { Negociacao } from './Negociacao';
import { Imprimivel } from './Imprimivel';
import { Igualavel } from './Igualavel';

export class Negociacoes implements Imprimivel, Igualavel<Negociacoes>
{
    // definindo o tipo que o array aceita
    private _negociacoes: Array<Negociacao> = [];

    // É uma boa prática sempre tipar o retorno mesmo que não retorne algo
    adiciona (negociacao: Negociacao): void
    {
        this._negociacoes.push(negociacao);
    }

    // definindo o tipo de retorno
    // idem ao do atributo, apenas de uma forma diferente de dizer
    paraArray (): Negociacao[]
    {
        // programação defensiva
        // define que os elmentos do array serão apenas Negociacao
        return ([] as Negociacao[]).concat(this._negociacoes);
    }

    // metodo exigido interface Imprimivel
    paraTexto ()
    {
        console.log('-- paraTexto --');
        console.log(JSON.stringify(this._negociacoes));
    }

    // exigido pela interface Igualavel
    ehIgual (negociacoes: Negociacoes)
    {
        return JSON.stringify(this.paraArray()) == JSON.stringify(negociacoes.paraArray());
    }
}