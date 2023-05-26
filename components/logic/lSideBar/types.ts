type Page = {
    title: string,
    link: string,
    icon: string,
    children?: Page[],
    if?: () => boolean
}
