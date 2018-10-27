// tornando jQuery public
// declare var $: any;

// <T> sigfica um tipo que as classes filhas podem definir
// para passar aos metodos herdados não sendo um tipo unico em cada classe que
// herdar aquele metodo 
export abstract class View<T>
{
    private _elemento: JQuery;
    // para remover tag <script> do template
    private _escapar: boolean;

    constructor (seletor: string, escapar?: boolean)
    {
        this._elemento = $(seletor);
        this._escapar = escapar;
    }

    // T define um tipo como string, number, ou ate classes...
    // que as herdeiras definem em sua assinatura
    update (model: T): void
    {
        let template = this.template(model);
        // se foi definido remove qualquer tag script
        if (this._escapar) template = template.replace(/<script>[\s\S]*?<\/script>/g, '');
        this._elemento.html(template);
    }

    // alternativa para dizer metodo obrigatório a ser definido
    // na classe que faz a herança desta
    abstract template (model: T): string;
}