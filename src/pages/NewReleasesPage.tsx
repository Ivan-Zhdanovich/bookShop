import React, {useEffect, useState} from 'react'
import {useLazySearchNewBooksQuery} from '../store/itbook/itbook.api'
import styles from "./styles.module.css";
import {BookCard} from '../components/bookCard';
import ReactPaginate from "react-paginate";

export function NewReleasesPage() {
    const [itemOffset, setItemOffset] = useState(0);
    const [fetchNewReleases, {isLoading: isNewReleasesLoading, data: books}] = useLazySearchNewBooksQuery()

    const itemsPerPage = 5;
    const endOffset = itemOffset + itemsPerPage;
    const currentItems = books?.slice(itemOffset, endOffset) ?? [];
    const pageCount = Math.ceil((books?.length ?? 0) / itemsPerPage);

    useEffect(() => {
        fetchNewReleases()
    }, [])

    const handlePageClick = (event: any) => {
        const newOffset = (event.selected * itemsPerPage) % (books?.length ?? 0);
        setItemOffset(newOffset);
    };

    return (
        <>
            <div className='container'>
                <ol className={styles.booksList}>
                    {isNewReleasesLoading && <p className='text-center'>Loading...</p>}
                    {currentItems.map(book => (
                        <li key={book?.isbn13}
                            className='py-2 px-4 hover:bg-gray-500 hover:text-white transition-colors cursor-pointer'>
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
            <ReactPaginate
                previousLabel={"← Previous"}
                nextLabel={"Next →"}
                pageCount={pageCount}
                onPageChange={handlePageClick}
                containerClassName={styles.pagination}
                previousLinkClassName={styles.pagination__link}
                nextLinkClassName={styles.pagination__link}
                disabledClassName={styles.pagination__link__disabled}
                activeClassName={styles.pagination__link__active}
            />
        </>
    )
}