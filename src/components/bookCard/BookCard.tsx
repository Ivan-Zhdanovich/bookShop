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
    // "border py-3 px-5 rounded mb-2 hover:shadow-md hover:bg-gray-100 transition-all"
    return (

        <div className={styles.card}>

            <div onClick={() => {
                <a href={url} target='_blank'></a>
            }}>
                <div className={styles.card}>
                    <a href={url} target='_blank'><img className={styles.image} src={image} alt={image}/></a>
                    <h1 className={styles.h1}>{title}</h1>
                    <h2>{subtitle}</h2>
                    <p>Price: {price}</p>

                </div>
            </div>
            <a href={url} target='_blank'>
                {!isFav &&
                    <button
                        className='py-1 px-3 bg-yellow-400 mr-2 rounded hover:shadow-md transition-all'
                        onClick={addToFavourite}
                    >Add</button>
                }
                {isFav && <button
                    className='py-1 px-3 bg-red-400 rounded hover:shadow-md transition-all'
                    onClick={removeFromFavourite}
                >Remove</button>
                }
            </a>
        </div>
    )
}
