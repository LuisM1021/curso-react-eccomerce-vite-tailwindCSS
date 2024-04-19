import { useEffect,useState } from "react"
function useLocalStorage(){
    const [signIn, setSignIn] = useState(false)
    const [account, setAccount] = useState(null)
    const setItem = (key,value) => {
        console.log('seteo de key: ',key,'value: ',value)
        localStorage.setItem(key,JSON.stringify(value))
    }
    const getItem = (key) => {
        return (JSON.parse(localStorage.getItem(key)))
    }
    if(!getItem('signIn')) setItem('signIn',false)
    if(!getItem('account')) setItem('account',[])
    //Initializing local storage for the values of sign in and account

    const saveSignIn = (value)=>{
        setSignIn(value)
        setItem('signIn',value)
    }
    const saveNewAccount = (newAccount)=>{
        const currentAccounts = getItem('account')
        if(currentAccounts){
            setItem('account',[...currentAccounts,newAccount])
        }else{
            setItem('account',[newAccount])
        }
        setAccount(getItem('account'))
    }
    return{
        setItem,getItem,signIn,account,saveSignIn,setAccount,saveNewAccount
    }
}
export {useLocalStorage}

// localStorage.setItem('account',JSON.stringify([
//     {
//         username: 'Luis',
//         email: 'lmuralles@platzi.com',
//         password: '12345678'
//     }
// ]))