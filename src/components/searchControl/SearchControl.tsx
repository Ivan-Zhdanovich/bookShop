import styles from './styles.module.css'

export function SearchControl({handleSearchInput, hasError}: any) {
    return (
        <div className={styles.search__container}>
            {hasError && <p>Something went wrong...</p>}
            <div className={styles.input_container}>
            <input className={styles.input}
                   type='text'
                   placeholder='Search for book...'
                   onChange={e => handleSearchInput(e.target.value)}
            /> 
        <img src="https://images-na.ssl-images-amazon.com/images/I/41gYkruZM2L.png" alt="search icon" className={styles.button}></img>
        </div> 
        </div>
    )
}
