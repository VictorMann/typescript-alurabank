// <T> sigfica um tipo que as classes filhas podem definir
// para passar aos metodos herdados não sendo um tipo unico em cada classe que
// herdar aquele metodo 
class View<T>
{
    protected _elemento: Element;

    constructor (seletor: string)
    {
        this._elemento = document.querySelector(seletor);
    }

    // T define um tipo como string, number, ou ate classes...
    // que as herdeiras definem em sua assinatura
    update (model: T): void
    {
        this._elemento.innerHTML = this.template(model);
    }

    // alternativa para dizer metodo obrigatório a ser definido
    // na classe que faz a herança desta
    template (model: T): string
    {
        throw new Error('Você deve implementar o método template');
    }
}