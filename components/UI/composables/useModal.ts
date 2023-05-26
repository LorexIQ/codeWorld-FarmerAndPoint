import {UseModal} from "~/components/UI/types/modal";

export default function (): UseModal {
    let modalOpenFunc: () => void;
    let modalCloseFunc: () => void;

    function open() {
        modalOpenFunc();
    }
    function close() {
        modalCloseFunc();
    }
    function initOpenFunc(func: () => void) {
        modalOpenFunc = func;
    }
    function initCloseFunc(func: () => void) {
        modalCloseFunc = func;
    }

    return {
        open,
        close,

        initOpen: initOpenFunc,
        initClose: initCloseFunc
    } as UseModal;
}
