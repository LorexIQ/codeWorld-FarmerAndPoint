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
type Review = {
    id:number,
    assessment: number,
    farmer: number,
    nameUser: string,
    reviews: string,
    user: number
}
type Basket = {
    id: number,
    id_user: number,
    id_statusBasket: number,
    id_subscriptionsBasket: number,
    name_user: string,
    name_statusBasket: string,
    name_subscriptionsBasket: string
}
type Order = {
    id: number,
    id_basket: number,
    id_product: number,
    name_product: string
}

