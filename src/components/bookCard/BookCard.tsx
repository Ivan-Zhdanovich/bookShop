import React, {useState} from 'react'
import {IBookInfo} from "../../models/models";
import {useActions} from '../../hooks/actions';
import {useAppSelector} from '../../hooks/redux';
import styles from './styles.module.css'


export function BookCard({title, image, url, desc, authors, subtitle, price, isbn13}: IBookInfo) {
    const {addFavourite, removeFavourite} = useActions()
    const {favourites} = useAppSelector(state => state.itbook)

    const [isFav, setIsFav] = useState(favourites.includes(isbn13))

    const addToFavourite = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        addFavourite(isbn13)
        setIsFav(true)
    }
    const removeFromFavourite = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        removeFavourite(isbn13)
        setIsFav(false)
    }
    
    return (
        <div className={styles.card}>
            <div onClick={() => {
                <a href={url} target='_blank' className={styles.cardWrapper}></a>
            }}>
                <div className={styles.card}>
                    <a href={url} target='_blank'><div className={styles.wrap}><img className={styles.image} src={image} alt={image}/></div>
                    <h1 className={styles.h1}>{title}</h1>
                    <h2>{subtitle} &nbsp;</h2>
                    <p>Price: {price}</p></a>
                </div>
            </div>
            <a href={url} target='_blank'>
                {!isFav && <button             
                        className={styles.buttonAdd}    
                        onClick={addToFavourite}
                    >Add to Favourites</button>
                }
                {isFav && <button
                    className={styles.buttonRemove}
                    onClick={removeFromFavourite}
                >Remove from Favourites</button>
                }
            </a>
        </div>
    )
}
