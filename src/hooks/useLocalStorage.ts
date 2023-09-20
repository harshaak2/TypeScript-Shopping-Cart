import { useEffect, useState } from "react";

//? making useLocalStorage hooks suitable for generic types
export function useLocalStorage<T>(key: string, initialValue: T | ( ()=> T )){
    //? this callback way of calling the function is efficient as that won't be re-rendered every time.
    const [value, setValue] = useState<T>(()=>{
        const jsonValue = localStorage.getItem(key)

        //? if there exists some data in the local storage
        if(jsonValue != null) return JSON.parse(jsonValue) 

        //? if there is no data on the local storage
        if(typeof initialValue === "function"){
            return (initialValue as () => T )() //? note that here initialValue is a function
        } else {
            return initialValue
        }
    })

    useEffect(()=>{
        localStorage.setItem(key, JSON.stringify(value))
    }, [key,value])

    return [value, setValue] as [typeof value, typeof setValue]
}   