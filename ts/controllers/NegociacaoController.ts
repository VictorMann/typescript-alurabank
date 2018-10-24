class NegociacaoController
{
    private _inputData: HTMLInputElement;
    private _inputQuantidade: HTMLInputElement;
    private _inputValor: HTMLInputElement;

    constructor ()
    {
        // casting : <HTMLInputElement>
        // convertendo para um tipo mais específico
        this._inputData = <HTMLInputElement>document.querySelector('#data');
        this._inputQuantidade = <HTMLInputElement>document.querySelector('#quantidade');
        this._inputValor = <HTMLInputElement>document.querySelector('#valor');
    }

    adiciona (event: Event)
    {
        // evitando a submissão do formulário
        event.preventDefault();

        // instanciando uma negociação
        const negocicao = new Negociacao(
            new Date(this._inputData.value.replace(/-/g, ',')),
            parseInt(this._inputQuantidade.value),
            parseFloat(this._inputValor.value)
        );

        console.log(negocicao);
    }
}