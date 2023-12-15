import React, {useEffect, useState} from 'react'
import styles from "../styles.module.css";
import ReactPaginate from "react-paginate";
import { BookCard } from '../../components/bookCard';
import { useAppSelector } from '../../hooks/redux';
import { useLazyGetBookInfoQuery } from '../../store/itbook/itbook.api';

export function FavouritesPage() {
    const [itemOffset, setItemOffset] = useState(0);
    const {favourites} = useAppSelector(state => state.itbook)
    const [fetchFavBooks, {isLoading: isFavLoading, data: books}] = useLazyGetBookInfoQuery()

    const itemsPerPage = 5;
    const endOffset = itemOffset + itemsPerPage;
    const currentItems = books?.slice(itemOffset, endOffset) ?? [];
    const pageCount = Math.ceil((books?.length ?? 1) / itemsPerPage);

    useEffect(() => {
        fetchFavBooks({books: favourites})
    }, [])

    const handlePageClick = (event: any) => {
        const newOffset = (event.selected * itemsPerPage) % (books?.length ?? 1);
        setItemOffset(newOffset);
    };

    return (
        <>
            <ol className={styles.booksList}>
                {isFavLoading && <p className={styles.textLoading}>Loading...</p>}
                {currentItems?.map(book => (
                    <li key={book?.isbn13}  className={styles.book}>
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
            </ol>
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