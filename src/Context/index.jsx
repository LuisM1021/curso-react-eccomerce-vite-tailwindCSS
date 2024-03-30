import { createContext, useState } from 'react';

const ShoppingContext = createContext()

function ShoppingContextProvider({children}){
    const [count,setCount] = useState(0)
    console.log(count)
    
    return(
        <ShoppingContext.Provider value={{
            count,
            setCount
        }}>
            {children}
        </ShoppingContext.Provider>
    )
}

export {ShoppingContext,ShoppingContextProvider}