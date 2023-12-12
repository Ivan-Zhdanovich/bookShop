import React, { useState } from 'react'
import { IBookInfo } from "../../models/models";
import { useActions } from '../../hooks/actions';
import { useAppSelector } from '../../hooks/redux';
import styles from './styles.module.css'
import { useLazyGetBookInfoQuery, useLazySearchBooksQuery, useSearchBooksQuery } from '../../store/itbook/itbook.api';
import { useDebounce } from '../../hooks/debounce';

export function SearchControl() {
   
    const [search, setSearch] = useState('');
    const debounced = useDebounce(search)
    const {isLoading, isError, data} = useSearchBooksQuery(debounced, {
        skip: debounced.length < 3,
        refetchOnFocus: true
    })
    const [fetchBooksSearch, {isLoading: areBooksLoading, data: books }] = useLazySearchBooksQuery()
    const [fetchBookInfo, { isLoading: isBookInfoLoading, data: bookInfo }] = useLazyGetBookInfoQuery()
    
return (
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
            >SearchButton</button> 
        </div>
</div>
    )
}
