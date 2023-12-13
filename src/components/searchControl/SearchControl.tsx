import styles from './styles.module.css'

export function SearchControl({handleSearchInput, hasError}: any) {
    return (
        <div className={styles.search__container}>
            {hasError && <p>Something went wrong...</p>}
            <input className={styles.input}
                   type='text'
                   placeholder='Search for book...'
                   onChange={e => handleSearchInput(e.target.value)}
            />
            <button type='submit'>Search</button>
        </div>
    )
}
