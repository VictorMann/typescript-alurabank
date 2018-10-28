export function throttle (milissegundos = 500) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {

        const metodoOriginal = descriptor.value;

        let timer = 0;

        // ... para indicar um REST PARAMETER
        descriptor.value = function (...args: any[]) {

            if (event) event.preventDefault();
            clearTimeout(timer);
            timer = setTimeout(() => metodoOriginal.apply(this, args), milissegundos);
        }

        return descriptor;
    }
}