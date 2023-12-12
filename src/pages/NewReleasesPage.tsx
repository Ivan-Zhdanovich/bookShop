import React, { useEffect } from 'react'
import { useLazySearchBooksQuery, useSearchBooksQuery } from '../store/itbook/itbook.api'
import styles from "./styles.module.css";
import { useDebounce } from '../hooks/debounce';
import { BookCard } from '../components/bookCard/BookCard';
import { SearchControl } from '../components/searchControl/SearchControl';

export function NewReleasesPage(){
    
   const [fetchNewReleases, { isLoading: isNewReleasesLoading, data: books }] = useLazySearchBooksQuery()
   
   useEffect(() => {
    const data = fetchNewReleases('new') 
   }, [])

return(
<>
<div className='container'>
    <h3>New Releases</h3>
    <SearchControl />
            <ol className={styles.booksList} >
                { books?.map(book => (
                    <li 
                    key={book.isbn13}
                    className='py-2 px-4 hover:bg-gray-500 hover:text-white transition-colors cursor-pointer'>
                        <BookCard
                        title={book?.title}
                        subtitle={book.subtitle}
                        price={book.price} 
                        isbn13={book.isbn13} 
                        url={book.url} 
                        image={book.image}/>                   
                    </li>
                ))}
            </ol>							
</div>
</>
    )
}