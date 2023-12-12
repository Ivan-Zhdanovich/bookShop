import React, { useEffect, useState } from 'react'
import { useLazyGetBookInfoQuery, useLazySearchBooksQuery, useSearchBooksQuery } from '../../store/itbook/itbook.api';
import { useDebounce } from '../../hooks/debounce';
import { BookCard } from '../../components/bookCard/BookCard';

// import { IBookInfo } from '../models/models';
import styles from "./styles.module.css";
import { SearchControl } from '../../components/searchControl';
// import { SearchControl } from '../../components/searchControl/SearchControl';


export function HomePage() {
    const [search, setSearch] = useState('');
    //const [dropdown, setDropdown] = useState(false)
    const debounced = useDebounce(search)
    const {isLoading, isError, data} = useSearchBooksQuery(debounced, {
        skip: debounced.length < 3,
        refetchOnFocus: true
    })
    const [fetchBooksSearch, {isLoading: areBooksLoading, data: books }] = useLazySearchBooksQuery()
    const [fetchBookInfo, { isLoading: isBookInfoLoading, data: bookInfo }] = useLazyGetBookInfoQuery()
    
    // useEffect(() => {
    //   setDropdown(debounced.length > 3 && data?.length! > 0) 
    // }, [debounced, data])

    const clickHandler2 = (title: string) => {
        fetchBooksSearch(title)
       // setDropdown(false)
    }

    const clickHandler = (title: string) => {
        fetchBookInfo(title)
       // setDropdown(false)
    }

    return (
        <>
        {/* <SearchControl /> */}
        <div className='container'>
        <div className={styles.searchControl}>
            { isError && <p className='text-center text-red-600'>Something went wrong...</p>}
                <input className={styles.input}
                type='text'               
                placeholder='Search for book...'
                value={search}
                onChange={e => setSearch(e.target.value)}
                />
             <button type='submit'
            className='bg-yellow-400 f-z-10px'
            // onClick={(e) => clickHandler2('beginners')}
            >Search</button> 
            </div>
            </div>       
            <div className='container'>    
                 <ol className={styles.booksList}>
                { isLoading && <p className='text-center'>Loading...</p>}
                { data?.map(book => (
                 <li key={book?.isbn13} className='py-2 px-4 hover:bg-gray-500 hover:text-white transition-colors cursor-pointer'>
                 <BookCard
                    title={book?.title}
                    subtitle={book.subtitle}
                    price={book.price} 
                    isbn13={book.isbn13} 
                    url={book.url} 
                    image={book.image}
                    />
            </li>
                ))}
                </ol>
            </div>
        </>     
    )
}