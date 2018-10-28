import {NegociacaoPartial, Negociacao} from '../models/index';

export class NegociacaoService
{
    // o retorno de promise é necessário tipar o que será retornado
    // , no caso, Negociacao[] (array de negociacoes)
    obterNegociacoes (handler: ResponseHandler): Promise<Negociacao[]>
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

// define uma interface que exige uma função qualquer que
// precisa ter um param do tipo Response e retornar um tipo Response também
export interface ResponseHandler
{
    (res: Response): Response
}