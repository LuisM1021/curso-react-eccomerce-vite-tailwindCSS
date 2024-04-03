import { createContext, useState } from 'react';

const ShoppingContext = createContext()

function ShoppingContextProvider({children}){
    //Shopping cart: Increment quantity
    const [count,setCount] = useState(0)

    //Shopping cart: Add products to cart
    const [cartProducts,setCartProducts] = useState([])
    console.log("Cart Products: ",cartProducts)
    //Product Detail: open7close
    const [isProductDetailOpen,setIsProductDetailOpen] = useState(false)
    const openProductDetail = ()=>{
        setIsProductDetailOpen(true)
    }
    const closeProductDetail = ()=>{
        setIsProductDetailOpen(false)
    }

    //Product Detail: Show product
    const [productToShow,setProductToShow] = useState({images:['#'],title:''})

    return(
        <ShoppingContext.Provider value={{
            count,
            setCount,
            openProductDetail,
            closeProductDetail,
            isProductDetailOpen,
            productToShow,
            setProductToShow,
            cartProducts,
            setCartProducts
        }}>
            {children}
        </ShoppingContext.Provider>
    )
}

export {ShoppingContext,ShoppingContextProvider}