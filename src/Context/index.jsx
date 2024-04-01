import { createContext, useState } from 'react';

const ShoppingContext = createContext()

function ShoppingContextProvider({children}){
    //Shopping cart: Increment quantity
    const [count,setCount] = useState(0)
    //Product Detail: open7close
    const [isProductDetailOpen,setIsProductDetailOpen] = useState(false)
    const openProductDetail = ()=>{
        setIsProductDetailOpen(true)
    }
    const closeProductDetail = ()=>{
        setIsProductDetailOpen(false)
    }

    //Product Detail: Show product
    const [productToShow,setProductToShow] = useState({})

    return(
        <ShoppingContext.Provider value={{
            count,
            setCount,
            openProductDetail,
            closeProductDetail,
            isProductDetailOpen,
            productToShow,
            setProductToShow
        }}>
            {children}
        </ShoppingContext.Provider>
    )
}

export {ShoppingContext,ShoppingContextProvider}