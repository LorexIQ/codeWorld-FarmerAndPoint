import {ref} from "#imports";
import {ButtonFetchStatus, UseSmartButtonResult} from "~/components/Smart/Button/types/entities";

export function useSmartButton(): UseSmartButtonResult {
    let status = ref(ButtonFetchStatus.SLEEP);

    function fetch<T>(activator: Promise<T>): Promise<string | T> {
        status.value = ButtonFetchStatus.LOADING;
        return new Promise((resolve, reject) => {
            activator
                .then(res => {
                    setTimeout((response) => {
                        status.value = ButtonFetchStatus.SUCCESS;
                        resolve(response);
                    }, 500, res);
                })
                .catch(err => {
                    setTimeout(() => {
                        status.value = ButtonFetchStatus.ERROR;
                        reject(err.data.message);
                    }, 600);
                });
        });
    }
    function dropStatus() {
        status.value = ButtonFetchStatus.SLEEP;
    }

    return {
        status,
        fetch,
        dropStatus
    };
}
