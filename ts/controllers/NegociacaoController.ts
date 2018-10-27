import { Negociacao, Negociacoes } from '../models/index';
import { NegociacoesView, MensagemView } from '../views/index';

export class NegociacaoController
{
    private _inputData: JQuery;
    private _inputQuantidade: JQuery;
    private _inputValor: JQuery;
    // o ts define por si só o tipo ref a instancia _negocicoes :Negociacoes
    private _negociacoes = new Negociacoes;
    private _negociacoesView = new NegociacoesView('#negociacoesView', true); // true: remove qualquer script no template
    private _mensagemView = new MensagemView('#mensagemView');

    constructor ()
    {
        // casting : <HTMLInputElement>
        // convertendo para um tipo mais específico
        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');
        // renderiza
        this._negociacoesView.update(this._negociacoes);
    }

    adiciona (event: Event)
    {
        // evitando a submissão do formulário
        event.preventDefault();

        // instanciando uma negociação
        const negocicao = new Negociacao(
            new Date(this._inputData.val().replace(/-/g, ',')),
            parseInt(this._inputQuantidade.val()),
            parseFloat(this._inputValor.val())
        );
        
        // add negocicao à lista
        this._negociacoes.adiciona(negocicao);
        // renderiza
        this._negociacoesView.update(this._negociacoes);
        // exibe mensagem
        this._mensagemView.update('Negociação adicionada!');
    }
}