import React from 'react'
import { useAppSelector } from '../hooks/redux'

export function FavouritesPage() {
   const {favourites} = useAppSelector(state => state.itbook)
console.log(favourites)
   if(favourites.length === 0) return <p className='text-center'>No items.</p>

//    const removeFavourites = (url: string) => {
//      const index = favourites.indexOf(url)
//      if (index === -1) {
//      favourites.splice(index, 1)
//      }
//      return favourites
//    }
//    const clickHandler = (url: string) => {
//     removeFavourites(url)
//    // setDropdown(false)
// }

 return (
   <div className='flex justify-center pt-10 mx-auto h-screen w-screen'>
    <ul className='list-none'>
    { favourites.map(f => 
      <li key={f}>
         <a href={f} target='_blank'>{f}</a>

         {/* <button 
               className='py-2 px-3 bg-red-400 rounded hover:shadow-md transition-all'
              //  onClick={(element) => clickHandler(f)}
            >Remove</button> */}
      </li>
      )}
    </ul>
    </div>
 )
}