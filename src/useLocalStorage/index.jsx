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
    let initialCurrentAccount = getItem('sessionAccount')
    let initialLastLogedAccount = getItem('lastLogedAccount')
    if(!initialLastLogedAccount){
        setItem('lastLogedAccount',null)
        initialLastLogedAccount = null
    }
    if(!initialSignIn){
        setItem('signIn',false)
        setItem('sessionAccount',null)
        initialCurrentAccount = null
        initialSignIn = false
    } 
    if(!initialAccount){
        setItem('account',[])
        initialAccount = []
    } 
    const [signIn, setSignIn] = useState(initialSignIn)
    const [account, setAccount] = useState(initialAccount)
    //Current session account 
    const [currentAccount,setCurrentAccount] = useState(initialCurrentAccount)
    const [lastLogedAccount,setLastLogedAccount] = useState(initialLastLogedAccount)

    const saveSignIn = (value)=>{
        setSignIn(value)
        setItem('signIn',value)
        if (!value){
            setCurrentAccount(null)
            setItem('sessionAccount',null)
        } 
    }
    const saveNewAccount = (newAccount)=>{
        const currentAccounts = getItem('account')
        if(currentAccounts){
            setItem('account',[...currentAccounts,newAccount])
        }else{
            setItem('account',[newAccount])
        }
        setCurrentAccount([newAccount])
        setItem('sessionAccount',[newAccount])
        setLastLogedAccount([newAccount])
        setItem('lastLogedAccount',[newAccount])
        setAccount(getItem('account'))
    }
    const editAccount = (editedAccount) => {
        const currentAccounts = getItem('account')
        currentAccounts.map(account => {
            if(account.email === editedAccount.email){
                account.username = editedAccount.username
                account.email = editedAccount.email
                account.password = editedAccount.password
                setCurrentAccount([account])
                setItem('sessionAccount',[account])
                setLastLogedAccount([account])
                setItem('lastLogedAccount',[account])
            }
        })
        setItem('account',currentAccounts)
        setAccount(currentAccounts)
    }
    //Verify credentials when the user clicks log in
    const verifyCredentials = (emailToVerify,passwordToVerify) =>{
        const matchEmail = account.filter((acc => acc.email === emailToVerify))
        if(matchEmail?.length>0){
            if(matchEmail[0].password === passwordToVerify){
                setCurrentAccount(matchEmail)
                setItem('sessionAccount',matchEmail)
                setLastLogedAccount(matchEmail)
                setItem('lastLogedAccount',matchEmail)
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
            password: false,
            errorMessage: null
        }
        const verifyUserName = account.find(acc => acc.username === username)
        const verifyEmail = account.find(acc => acc.email === email)
        if(!verifyEmail){
            verified.email = true
        }else{
            verified.errorMessage = 'EMAIL_EXISTS'
        }
        if(!verifyUserName){
            verified.username = true
        }else if(verifyUserName && !verifyEmail){
            verified.errorMessage = 'USERNAME_EXISTS'
        }
        verified.password = true
        return verified
    }

    const verifyEditedUser = (username,previousUsername,email,password)=>{
        let verified = {
            username: false,
            email: true,
            password: false,
            errorMessage: null
        }
        if(username === previousUsername){
            verified.username = true
        }else{
            const verifyUserName = account.find(acc => acc.username === username)
            if(!verifyUserName){
                verified.username = true
            }else{
                verified.errorMessage = 'USERNAME_EXISTS'
            }
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
        verifyNewUser,
        verifyEditedUser,
        currentAccount,
        lastLogedAccount,
        editAccount
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