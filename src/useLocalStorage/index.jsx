import { useState } from "react"
function useLocalStorage(){
    const setItem = (key,value) => {
        localStorage.setItem(key,JSON.stringify(value))
    }
    const getItem = (key) => {
        return (JSON.parse(localStorage.getItem(key)))
    }
    let initialSignIn = getItem('signIn')
    let initialAccount = getItem('account')
    if(!initialSignIn){
        setItem('signIn',false)
        initialSignIn = false
    } 
    if(!initialAccount){
        setItem('account',[])
        initialAccount = []
    } 
    const [signIn, setSignIn] = useState(initialSignIn)
    const [account, setAccount] = useState(initialAccount)

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

    //Verify credentials when the user clicks log in
    const verifyCredentials = (emailToVerify,passwordToVerify) =>{
        const matchEmail = account.filter((acc => acc.email === emailToVerify))
        if(matchEmail?.length>0){
            if(matchEmail[0].password === passwordToVerify){
                return 'VERIFIED'
            }
            else{
                return 'NOT_VALID_PASSWORD'
            }
        }else{
            return 'NOT_VALID_EMAIL'
        }
    }
    const verifyNewUser = (username,email,password)=>{
        let verified = {
            username: false,
            email: false,
            password: false
        }
        const verifyUserName = account.find(acc => acc.username === username)
        const verifyEmail = account.find(acc => acc.email === email)
        if(!verifyUserName){
            verified.username = true
        }
        if(!verifyEmail){
            verified.email = true
        }
        verified.password = true
        return verified
    }
    return{
        setItem,
        getItem,
        signIn,
        account,
        saveSignIn,
        setAccount,
        saveNewAccount,
        verifyCredentials,
        verifyNewUser
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