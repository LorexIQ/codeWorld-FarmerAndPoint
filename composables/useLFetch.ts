import {useAuth, useFetch, useRuntimeConfig} from "#imports";

export default function<T>(url: string) {
    const config = useRuntimeConfig();
    const auth = useAuth();

    const fetch = useFetch<T>(url, {
        baseURL: config.public.auth.baseURL,
        headers: {
            Authorization: auth.token.value ?? ''
        }
    })
    return fetch;
}
