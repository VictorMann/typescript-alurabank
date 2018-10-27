export function logarTempoDeExecucao (emSegundos: boolean = false) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {

        const metodoOriginal = descriptor.value;

        // ... para indicar um REST PARAMETER
        descriptor.value = function (...args: any[]) {

            let divisor = 1;
            let unidade = 'milissegundos';
            if (emSegundos) {
                divisor = 1000;
                unidade = 'segundos';
            }

            console.log('-------------------');
            console.log(`Parametros do metodo ${propertyKey}: ${JSON.stringify(args)}`);
            const t1 = performance.now();
            const resultado = metodoOriginal.apply(this, args);
            const t2 = performance.now();
            console.log(`${propertyKey} demorou ${(t2 - t1)/divisor} ${unidade}`);
            console.log('-------------------');
            return resultado;
        }

        return descriptor;
    }
}