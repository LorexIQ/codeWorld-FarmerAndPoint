import {Ref} from "@vue/reactivity";


export type UseSmartInputsConfigType<T> = {
    [key in keyof T]: UseSmartInputReturn
}
export type UseSmartInputsValues<T> = {
    [key in keyof T]: string
}
export type UseSmartInputAttrs = {
    [name: string]: string
}

export interface UseSmartInputsProps {
    [name: string]: UseSmartInputProps
}
export interface UseSmartInputProps {
    regex: RegexObgValue
    attrs?: UseSmartInputAttrs

    onValid?(): void
    onError?(): void
}

export interface UseSmartInputsReturn<T extends UseSmartInputsProps> {
    values: UseSmartInputsValues<T>
    store: UseSmartInputsConfigType<T>
    status: Ref<InputActivator>

    check(): boolean
}
export interface UseSmartInputReturn {
    value: Ref<string>
    status: Ref<InputActivator>
    regex: RegexObgValue
    attrs: UseSmartInputAttrs

    check(): boolean
}
export interface UseSmartInputExtendedReturn extends UseSmartInputReturn {
    validateFunc(func: () => boolean): void
}


export enum InputActivator {
    UNCHECK,
    VALIDATE,
    ERROR,
}
