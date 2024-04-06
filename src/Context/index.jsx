import { createContext, useState } from 'react';

const ShoppingContext = createContext()

function ShoppingContextProvider({children}){
    //Shopping cart: Increment quantity
    const [count,setCount] = useState(0)

    //Shopping cart: Add products to cart
    const [cartProducts,setCartProducts] = useState([])
    //Shopping cart: Order
    const [order,setOrder] = useState([])
    //Product Detail: open/close
    const [isProductDetailOpen,setIsProductDetailOpen] = useState(false)
    const openProductDetail = ()=>{
        setIsProductDetailOpen(true)
    }
    const closeProductDetail = ()=>{
        setIsProductDetailOpen(false)
    }
    //Checkout: open/close
    const [isCheckoutSideMenuOpen,setIsCheckoutSideMenuOpen] = useState(false)
    const openCheckoutSideMenu = ()=>{
        setIsCheckoutSideMenuOpen(true)
    }
    const closeCheckoutSideMenu = ()=>{
        setIsCheckoutSideMenuOpen(false)
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
            setCartProducts,
            isCheckoutSideMenuOpen,
            openCheckoutSideMenu,
            closeCheckoutSideMenu,
            order,
            setOrder
        }}>
            {children}
        </ShoppingContext.Provider>
    )
}

export {ShoppingContext,ShoppingContextProvider}