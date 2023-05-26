export interface UseModal {
    open: () => void
    close: () => void
}
export interface UseModalExtended extends UseModal{
    initOpen(func: () => void): void
    initClose(func: () => void): void
}
