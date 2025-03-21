import { useState,useEffect } from "react";

export function useDebounce(value:string,delay:number){
    const [debounceValue,setDebounceValue]=useState(value);

    useEffect(()=>{
       const handle=setTimeout(()=>{
         setDebounceValue(value);
       },delay);

       return ()=> clearTimeout(handle);
    },[value,delay])


    return debounceValue;
}