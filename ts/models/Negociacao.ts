export class Negociacao
{
    // declaração das propriedades de classe
    // typescript

    // torna as propriedades somente leitura, uma forma para reduzir código não tendo que escrever
    // como private e os getter
    constructor (readonly data: Date, readonly quantidade: number, readonly valor: number) {}

    get volume ()
    {
        return this.quantidade * this.valor;
    }
}