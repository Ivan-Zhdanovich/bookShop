export interface ServerResponse<T> {
    error: string
    total: number
    page?: number
    books: T[]
  }
  
  export interface IBook {
    title: string
    subtitle: string
    isbn13: string
    price: string
    image: string
    url: string
  }

  export interface IBookInfo {
    error?: string
    title: string
    subtitle: string
    authors?: string
    publisher?: string
    language?: string
    isbn10?: string
    isbn13: string
    pages?: string
    year?: string
    rating?: string
    desc?: string
    price: string
    image: string
    url: string
    pdf?: IPdf
  }
  
  
  export interface IPdf {
    "Chapter 1": string
    "Chapter 4": string
  }
  