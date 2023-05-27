type LTableAlign = 'left' | 'center' | 'right';

type TableCell<T> = {
    id: keyof T | null,
    title: string,
    type: 'text' | 'increment' | 'actions' | 'rPrice' | 'date',
    align?: LTableAlign,
    width?: string,
    sort?: boolean,
    filter?: boolean
}
