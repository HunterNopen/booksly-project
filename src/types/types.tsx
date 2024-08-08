export interface NavbarItem {
    name: string,
    href: string
}

export interface Book {
    title: string,
    author_name: string,
    isbn: number[],
    first_sentence?: string,
    status: string | null
}