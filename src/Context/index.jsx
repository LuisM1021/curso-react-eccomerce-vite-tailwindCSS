import { createContext, useState, useEffect } from 'react';
import { useLocalStorage } from '../useLocalStorage';

const ShoppingContext = createContext()

function ShoppingContextProvider({children}){
    const {
        signIn,saveSignIn
    } = useLocalStorage()
    // Get products
    const [items,setItems] = useState(null)
    useEffect(()=>{
        fetch('https://api.escuelajs.co/api/v1/products')
        .then(res=>res.json())
        .then(data=>setItems(data))
      },[])
      
    //Search products by title
    const [searchByTitle,setSearchByTitle] = useState(null)
    
    //Search products by category
    const [searchByCategory,setSearchByCategory] = useState(null)

    //Products filtered
    const [filteredItems,setFilteredItems] = useState(null)
    const filterByTitle = ()=>{
        setFilteredItems(items?.filter(item => item.title.toLowerCase().includes(searchByTitle?.toLowerCase())))
    }
    const filterByCategory = ()=>{
        setFilteredItems(items?.filter(item => item.category.name.toLowerCase().includes(searchByCategory?.toLowerCase())))
    }

    const filterByTitleAndCategory = ()=>{
        setFilteredItems(items?.filter(item => item.category.name.toLowerCase().includes(searchByCategory?.toLowerCase())).filter(item => item.title.toLowerCase().includes(searchByTitle?.toLowerCase())))
    }

    const filterBy = (searchType) => {
        if(searchType === 'BY_TITLE'){
            filterByTitle()
        }
        if(searchType === 'BY_CATEGORY'){
            filterByCategory()
        }
        if(searchType === 'BY_TITLE_AND_CATEGORY'){
            filterByTitleAndCategory()
        }
        if(!searchType){
            setFilteredItems(items)
        }
        
    }
    useEffect(()=>{
        if(searchByTitle && !searchByCategory) filterBy('BY_TITLE')
        if(!searchByTitle && searchByCategory) filterBy('BY_CATEGORY')
        if(!searchByTitle && !searchByCategory) filterBy(null)
        if(searchByTitle && searchByCategory) filterBy('BY_TITLE_AND_CATEGORY')
    },[items,searchByTitle, searchByCategory])
    
    
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
            setOrder,
            items,
            setItems,
            searchByTitle, 
            setSearchByTitle,
            filterByTitle,
            filteredItems,
            searchByCategory,
            setSearchByCategory,
            signIn,
            saveSignIn
        }}>
            {children}
        </ShoppingContext.Provider>
    )
}

export {ShoppingContext,ShoppingContextProvider}