import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import { IBook, IBookInfo, ServerResponse } from '../../models/models'

const url = 'https://api.itbook.store/1.0/'

export const itbookApi = createApi({
    reducerPath: 'itbook/api',
    baseQuery: fetchBaseQuery({
        baseUrl: url
    }),
    refetchOnFocus: true,
    endpoints: build => ({
        searchBooks: build.query<ServerResponse<IBook>, { value: string; page: number }>({
            query: ({ value, page }) => ({
                url: `search/${value}/${page}`,
            }),
            transformResponse: (response: ServerResponse<IBook>) => response
        }),
        searchNewBooks: build.query<IBook[], void>({
            query: () => ({
                url: `new`
            }),
            transformResponse: (response: ServerResponse<IBook>) => response.books
        }),
        getBookInfo: build.query<IBookInfo[], { books: string[] }>({
            queryFn: async (arg, api, extraOptions, baseQuery) => {
                const { books } = arg
                let results = []
                for (const [_, value] of Object.entries(books)) {
                    let result = await baseQuery(`/books/${value}`)
                    results.push(result.data)
                }
                return {data: results as IBookInfo[]}
            }
        }),
    })
        
})

export const {useSearchBooksQuery, useLazySearchNewBooksQuery, useLazyGetBookInfoQuery} = itbookApi