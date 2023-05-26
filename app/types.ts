type User = {
    id: string,
    login: string,
    name: string,
    email: string,
    phone: string,
    address: string,
    dateRegistration: string,
    photo: string | null,
    role: 'ADMIN' | 'USER' | 'FARMER',
    card: string | null,
    discount: number,

    value: User
}

type Card = {
    number: string,
    date: string,
    cvv: string,
    new?: boolean
};
type Category = {
    id: number,
    name: string,
    categoryProduct: Category | null
}
type Product = {
    id: number,
    id_user: number,
    id_category: number,
    categoryName: string,
    name: string,
    description: string,
    cost: number,
    photo: string | null
}

