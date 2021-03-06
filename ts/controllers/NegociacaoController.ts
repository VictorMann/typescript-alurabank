import { Negociacao, Negociacoes } from '../models/index';
import { NegociacoesView, MensagemView } from '../views/index';
import { domInject, throttle } from '../helpers/decorators/index';
import { NegociacaoPartial } from '../models/index';
import { NegociacaoService } from '../services/index';
import { imprime } from '../helpers/index';

export class NegociacaoController
{
    @domInject('#data')
    private _inputData: JQuery;

    @domInject('#quantidade')
    private _inputQuantidade: JQuery;

    @domInject('#valor')
    private _inputValor: JQuery;

    // o ts define por si só o tipo ref a instancia _negocicoes :Negociacoes
    private _negociacoes = new Negociacoes;
    private _negociacoesView = new NegociacoesView('#negociacoesView', true); // true: remove qualquer script no template
    private _mensagemView = new MensagemView('#mensagemView');
    private _negociacoesService = new NegociacaoService;

    constructor ()
    {
        // casting : <HTMLInputElement>
        // convertendo para um tipo mais específico
        //
        //  não é mais necessário devido a injeção nas propriedades com @domInject 
        //
        // this._inputData = $('#data');
        // this._inputQuantidade = $('#quantidade');
        // this._inputValor = $('#valor');
        // renderiza
        this._negociacoesView.update(this._negociacoes);
    }

    adiciona (event: Event)
    {
        // evitando a submissão do formulário
        event.preventDefault();

        let data = new Date(this._inputData.val().replace(/-/g, ','));

        // não permite o cadastramento em fds
        if (!this._ehDiaUtil(data)) {
            this._mensagemView.update('Somente negociações em dias úteis, por favor!');
            return;
        }

        // instanciando uma negociação
        const negociacao = new Negociacao(
            data,
            parseInt(this._inputQuantidade.val()),
            parseFloat(this._inputValor.val())
        );
        
        // add negocicao à lista
        this._negociacoes.adiciona(negociacao);

        // executa log
        imprime(negociacao, this._negociacoes);

        // renderiza
        this._negociacoesView.update(this._negociacoes);
        // exibe mensagem
        this._mensagemView.update('Negociação adicionada!');
    }

    // obtem dados de uma API
    // define intervalo, para evitar cliques consecutivos onerosamente
    // ES2017 foi introduzida a sintaxe async/await
    @throttle()
    async importaDados ()
    {
        try {
            // era usado como param de obterNegociacoes()
            // function isOk (res: Response) { if (res.ok) return res; throw new Error(res.statusText); }
            const negociacoesParaImportar = await this._negociacoesService
            .obterNegociacoes(res => {
                if (res.ok) return res;
                throw new Error(res.statusText);
            });
            
            negociacoesParaImportar
            .filter(negociacaoParaImportar => 
                !this._negociacoes.paraArray().some(negociacao => 
                    negociacao.ehIgual(negociacaoParaImportar)
                )
            )
            .forEach(negociacao =>
                this._negociacoes.adiciona(negociacao)
            );
            // renderiza a as novas negociacoes
            this._negociacoesView.update(this._negociacoes);

        } catch (err) {

            console.log(err);
            this._mensagemView.update('Não foi possível buscar a API');
        }
    }

    // valida se é dia útil
    private _ehDiaUtil (data: Date): boolean
    {
        return data.getDay() != DiaDaSemana.domingo && data.getDay() != DiaDaSemana.sabado
    }
}

// de representa a numeração do javascript dos dias da semana
// (domingo = 0) à (sabado = 6)
enum DiaDaSemana {
    domingo,
    segunda,
    terca,
    quarta,
    quinta,
    sexta,
    sabado
}