import {useAuth, useFetch, useRuntimeConfig} from "#imports";


type FetchMethod = 'GET' | 'POST';
type FetchOptions = {
    method: FetchMethod,
    body?: {}
}

export default function<T>(url: string, options?: FetchOptions) {
    const config = useRuntimeConfig();
    const auth = useAuth();

    return $fetch<T>(url, {
        baseURL: config.public.auth.baseURL,
        method: options?.method,
        body: options?.body,
        headers: {
            Authorization: auth.token.value ?? ''
        },
    })
}
