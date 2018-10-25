class Negociacoes
{
    // definindo o tipo que o array aceita
    private _negocicoes: Array<Negociacao> = [];

    adiciona (negociacao: Negociacao): void
    {
        this._negocicoes.push(negociacao);
    }

    // definindo o tipo de retorno
    // idem ao do atributo, apenas de uma forma diferente de dizer
    paraArray (): Negociacao[]
    {
        // programação defensiva
        return [].concat(this._negocicoes);
    }
}