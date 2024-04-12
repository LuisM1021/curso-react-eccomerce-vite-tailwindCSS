import { createContext, useState, useEffect } from 'react';

const ShoppingContext = createContext()

function ShoppingContextProvider({children}){
    // Get products
    const [items,setItems] = useState(null)
    useEffect(()=>{
        fetch('https://api.escuelajs.co/api/v1/products')
        .then(res=>res.json())
        .then(data=>setItems(data))
      },[])

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

    //Search products by title
    const [searchByTitle,setSearchByTitle] = useState(null)
    console.log(searchByTitle)
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
            setOrder,
            items,
            setItems,
            searchByTitle, 
            setSearchByTitle
        }}>
            {children}
        </ShoppingContext.Provider>
    )
}

export {ShoppingContext,ShoppingContextProvider}