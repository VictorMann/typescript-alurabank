import {NegociacaoPartial, Negociacao} from '../models/index';

export class NegociacaoService
{
    // o retorno de promise é necessário tipar o que será retornado
    // , no caso, Negociacao[] (array de negociacoes)
    obterNegociacoes (handler: Function): Promise<Negociacao[]>
    {
        return fetch('http://localhost:8080/dados')
            .then(res => handler(res))
            .then(res => res.json())
            .then((dados: NegociacaoPartial[]) =>
                dados.map(dado => new Negociacao(new Date(), dado.vezes, dado.montante))
            )
            .catch();
    }
}