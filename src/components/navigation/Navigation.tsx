import React from 'react'
import { Link } from 'react-router-dom'
import styles from './styles.module.css'

export function Navigation() {
    return (
        <nav className={styles.navigation}>
            <h3 className={styles.navigationItem}>BOOKSTORE</h3>
            <span>
                <Link to="/" className={styles.navigationItem}>Home</Link>
                <Link to="/favourites" className={styles.navigationItem}>Favourites</Link>
                <Link to="/newReleases" className={styles.navigationItem}>New releases</Link>
            </span>
        </nav>
    )
}