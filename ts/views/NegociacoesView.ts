class NegociacoesView
{
    private _elemento: Element;

    constructor (seletor: string)
    {
        this._elemento = document.querySelector(seletor);
    }

    update (negociacoes: Negociacoes): void
    {
        this._elemento.innerHTML = this.template(negociacoes);
    }

    template (negociacoes: Negociacoes): string
    {
        return `
        <table class="table table-hover table-bordered">
            <thead>
                <tr>
                    <th>DATA</th>
                    <th>QUANTIDADE</th>
                    <th>VALOR</th>
                    <th>VOLUME</th>
                </tr>
            </thead>

            <tbody>
                ${negociacoes.paraArray().map(negocicao => `
                    <tr>
                        <td>${negocicao.data.getDate()}/${negocicao.data.getMonth() +1}/${negocicao.data.getFullYear()}</td>
                        <td>${negocicao.quantidade}</td>
                        <td>${negocicao.valor}</td>
                        <td>${negocicao.volume}</td>
                    </tr>
                `).join('')}
            </tbody>

            <tfoot>
            </tfoot>
        </table>
        `;
    }
}