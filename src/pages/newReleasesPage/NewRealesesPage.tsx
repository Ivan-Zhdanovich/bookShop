import React, {useEffect, useState} from 'react'
import styles from "../styles.module.css";
import ReactPaginate from "react-paginate";
import { useLazySearchNewBooksQuery } from '../../store/itbook/itbook.api';
import { BookCard } from '../../components/bookCard';

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
                    {isNewReleasesLoading && <p className={styles.textLoading}>Loading...</p>}
                    {currentItems.map(book => (
                        <li key={book?.isbn13} className={styles.book}>
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