export type LNavBarPage = {
    title: string;
    link: string;
};
export type LNavBarPages = LNavBarPage[];

export type User = {
    id: number,
    login: string,
    email: string,
    name: string | null
}
