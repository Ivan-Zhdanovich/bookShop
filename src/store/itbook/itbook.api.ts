import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import { IBook, IBookInfo, ServerResponse } from '../../models/models'

export const itbookApi = createApi({
    reducerPath: 'itbook/api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://api.itbook.store/1.0/'
    }),
    refetchOnFocus: true,
    endpoints: build => ({
        searchBooks: build.query<IBook[], string>({
            query: (search: string) => ({
                url: `search/${search}`,      
            }),
            transformResponse: (response: ServerResponse<IBook>) => response.books
        }),
        getBookInfo: build.query<IBookInfo|any, string>({
            query: (isbn13: string) => ({
                url: `books/${isbn13}`
                
            })
        }),
    })
        
})

export const {useSearchBooksQuery, useLazySearchBooksQuery, useLazyGetBookInfoQuery} = itbookApi