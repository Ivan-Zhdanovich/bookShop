import React, {useEffect, useState} from 'react'
import {useSearchBooksQuery} from '../../store/itbook/itbook.api'
import {BookCard} from '../../components/bookCard'
import {SearchControl} from '../../components/searchControl'
import {useDebounce} from "../../hooks/debounce"
import styles from "../styles.module.css";
import ReactPaginate from "react-paginate"

export function HomePage() {
    const [search, setSearch] = useState('')
    const [page, setPage] = useState(1)
    const [bookList, showBookList] = useState(false)
    const debounced = useDebounce(search, page)
    const {isLoading, isError, data} = useSearchBooksQuery(debounced, {
        skip: debounced.value.length < 3,
        refetchOnFocus: true
    })
   useEffect(() =>  {
    showBookList(search?.length > 2 && data?.total! > 0)
   }, [debounced, data])

    const itemsPerPage = 10;
    let pageCount = Math.ceil(((data?.total ?? 0) / itemsPerPage));

    if (pageCount > 100) {
        //API supports only 100 pages
        pageCount = 100;
    }

    const handleSearchInput = (searchText: string) => {
        setSearch(searchText);
        setPage(1)
    };

    const handlePageClick = (event: any) => {
        setPage(event.selected + 1);
    };

    return (
        <>
            {<SearchControl handleSearchInput={handleSearchInput} hasError={isError}/>}
            {bookList && <ol className={styles.booksList}>
                {isLoading && <p className={styles.textLoading}>Loading...</p>}
                {data?.books.map(book => (
                    <li key={book?.isbn13} className={styles.book}>
                        <BookCard
                            title={book?.title}
                            subtitle={book?.subtitle}
                            price={book?.price}
                            isbn13={book?.isbn13}
                            url={book?.url}
                            image={book?.image}
                        />
                    </li>
                ))}
            </ol>}
            {bookList && <ReactPaginate                 
                previousLabel={"← Previous"}
                nextLabel={"Next →"}
                pageCount={pageCount}
                forcePage={page-1}
                onPageChange={handlePageClick}
                containerClassName={styles.pagination}
                previousLinkClassName={styles.pagination__link}
                nextLinkClassName={styles.pagination__link}
                disabledClassName={styles.pagination__link__disabled}
                activeClassName={styles.pagination__link__active}
             />}
        </>
    )
}