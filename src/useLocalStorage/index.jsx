import { useEffect,useState } from "react"
function useLocalStorage(){
    const [signIn, setSignIn] = useState(false)
    const [account, setAccount] = useState(null)
    const setItem = (key,value) => {
        localStorage.setItem(key,JSON.stringify(value))
    }
    const getItem = (key) => {
        return (JSON.parse(localStorage.getItem(key)))
    }
    if(!getItem('signIn')) setItem('signIn',false)
    //Initializing local storage for the values of sign in and account
    useEffect(()=>{
        if(!account) setItem('account',false)
    },[signIn,account])

    const saveSignIn = (value)=>{
        setSignIn(value)
        setItem('signIn',value)
    }
    return{
        setItem,getItem,signIn,account,saveSignIn,setAccount
    }
}
export {useLocalStorage}