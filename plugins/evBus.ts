// @ts-ignore
import mitt from 'mitt';
import {defineNuxtPlugin} from "#imports";

export default defineNuxtPlugin(() => {
    const emitter = mitt()

    return {
        provide: {
            event: emitter.emit,
            listen: emitter.on
        }
    }
})
