import { createContext, useState } from 'react';

const ShoppingContext = createContext()

function ShoppingContextProvider({children}){
    const [count,setCount] = useState(0)
    const [isProductDetailOpen,setIsProductDetailOpen] = useState(false)
    const openProductDetail = ()=>{
        setIsProductDetailOpen(true)
    }
    const closeProductDetail = ()=>{
        setIsProductDetailOpen(false)
    }
    

    return(
        <ShoppingContext.Provider value={{
            count,
            setCount,
            openProductDetail,
            closeProductDetail,
            isProductDetailOpen
        }}>
            {children}
        </ShoppingContext.Provider>
    )
}

export {ShoppingContext,ShoppingContextProvider}