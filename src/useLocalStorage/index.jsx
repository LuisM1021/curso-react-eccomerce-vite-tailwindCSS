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
        setAccount(getItem('account'))
    }
    //TODO: TERMINAR LOGICA DE EDITAR CUENTA, PERO VER LO DEL EMAIL YA QUE NO DEBERIA DE CAMBIARLO, EN TODO CASO 
    //CREARÍA UNA CUENTA NUEVA. 
    const editAccount = (editedAccount) => {
        const currentAccounts = getItem('account')
        currentAccounts.map(account => {
            if(account.email === editedAccount.email){
                account.name = editedAccount.name
                account.email = editedAccount.email
                account.password = editedAccount.password

            }
        })
    }
    //Verify credentials when the user clicks log in
    const verifyCredentials = (emailToVerify,passwordToVerify) =>{
        const matchEmail = account.filter((acc => acc.email === emailToVerify))
        if(matchEmail?.length>0){
            if(matchEmail[0].password === passwordToVerify){
                setCurrentAccount(matchEmail)
                setItem('sessionAccount',matchEmail)
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
        verifyNewUser,
        currentAccount,
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