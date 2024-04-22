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
    if(!getItem('account')) setItem('account',[])
    //Initializing local storage for the values of sign in and account
    useEffect(()=>{
        const accounts = getItem('account')
        if(accounts) setAccount(accounts)
    },[])
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
        console.log("nueva cuenta: "+newAccount)
    }

    //Verify credentials when the user clicks log in
    const verifyCredentials = (emailToVerify,passwordToVerify) =>{
        const matchEmail = account.filter((acc => acc.email === emailToVerify))
        if(matchEmail?.length>0){
            if(matchEmail[0].password === passwordToVerify){
                return ['/','VERIFIED']
            }
            else{
                return ['.','NOT_VALID_PASSWORD']
            }
        }else{
            return ['.','NOT_VALID_EMAIL']
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