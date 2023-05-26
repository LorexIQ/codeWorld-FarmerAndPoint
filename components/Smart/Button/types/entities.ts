import {Ref} from "@vue/reactivity";

export interface UseSmartButtonResult {
    status: Ref<ButtonFetchStatus>
    fetch<T>(activator: Promise<T>): Promise<string | T>
    dropStatus(): void
}

export enum ButtonFetchStatus {
    SLEEP,
    SUCCESS,
    ERROR,
    LOADING
}
