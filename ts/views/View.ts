// tornando jQuery public
// declare var $: any;

// <T> sigfica um tipo que as classes filhas podem definir
// para passar aos metodos herdados não sendo um tipo unico em cada classe que
// herdar aquele metodo 
export abstract class View<T>
{
    private _elemento: JQuery;

    constructor (seletor: string)
    {
        this._elemento = $(seletor);
    }

    // T define um tipo como string, number, ou ate classes...
    // que as herdeiras definem em sua assinatura
    update (model: T): void
    {
        this._elemento.html(this.template(model));
    }

    // alternativa para dizer metodo obrigatório a ser definido
    // na classe que faz a herança desta
    abstract template (model: T): string;
}