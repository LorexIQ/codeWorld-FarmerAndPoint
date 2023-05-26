import {reactive, ref} from "#imports";
import {
    InputActivator,
    UseSmartInputProps,
    UseSmartInputReturn, UseSmartInputsConfigType,
    UseSmartInputsProps,
    UseSmartInputsReturn, UseSmartInputsValues
} from "~/components/Smart/Input/types/entities";


export function UseSmartInputs<T extends UseSmartInputsProps>(
    inputs: T
): UseSmartInputsReturn<T> {
    const store = {} as UseSmartInputsConfigType<T>;
    let status = ref(InputActivator.UNCHECK);
    let values = {} as  UseSmartInputsValues<T>;

    for (let inputsKey in inputs) {
        values[inputsKey] = 'asd';
        store[inputsKey] = UseSmartInput(inputs[inputsKey]);
    }

    function check(): boolean {
        let statusRes = InputActivator.VALIDATE;
        for (let storeKey in store) {
            const input = store[storeKey] as UseSmartInputReturn;
            input.status.value = InputActivator.UNCHECK
            if (!input.check()) {
                status.value = InputActivator.ERROR;
                statusRes = status.value;
            }
            values[storeKey] = input.value.value;
        }
        return statusRes === InputActivator.VALIDATE;
    }

    return {
        values,
        store,
        status,
        check
    };
}

export function UseSmartInput(
    config: UseSmartInputProps
): UseSmartInputReturn {
    let value = ref('');
    let status = ref(InputActivator.UNCHECK);
    let attrs = { ...config.attrs };
    let validateFuncStore = () => true;

    function validateFunc(func: () => boolean) {
        validateFuncStore = func;
    }

    function onValid() {
        config.onValid && config.onValid();
    }
    function onError() {
        config.onError && config.onError();
    }

    function check() {
        const checkResult = validateFuncStore();

        if (checkResult) {
            status.value = InputActivator.VALIDATE;
            onValid();
        } else {
            status.value = InputActivator.ERROR;
            onError();
        }

        return checkResult;
    }

    return {
        value,
        status,
        regex: config.regex,
        attrs,

        check,
        validateFunc
    } as UseSmartInputReturn;
}

