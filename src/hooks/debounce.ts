import { useEffect, useState } from "react"


export function useDebounce(value: string, page: number, delay = 300): { page: number; value: string }  {
 const [debounced, setDebounced] = useState({value, page})

 useEffect(() => {
    const handler = setTimeout(() => setDebounced({value, page}), delay )
    return () => clearTimeout(handler)
 }, [{value, page}, delay])

 return debounced
}