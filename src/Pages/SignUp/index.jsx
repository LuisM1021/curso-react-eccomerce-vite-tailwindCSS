import { Layout } from "../../Components/Layout"
import { useNavigate } from "react-router-dom"
import { useContext, useState } from "react"
import { ShoppingContext } from "../../Context"
function SignUp(){
    const context = useContext(ShoppingContext)
    const navigate = useNavigate()
    const [userName,setUserName] = useState('') 
    const [isUsernameCorrect,setIsUsernameCorrect] = useState(false)
    const [email,setEmail] = useState('') 
    const [isEmailCorrect,setIsEmailCorrect] = useState(false)
    const [password,setPassword] = useState('') 
    const [isPasswordCorrect,setIsPasswordCorrect] = useState(false)
    const [badCredentials,setBadCredentials] = useState([])
    const [errorMessage,setErrorMessage] = useState(null)
    const handleSignUp = () =>{
        if(userName === '' || email === '' || password === ''){
            setIsUsernameCorrect(false)
            setIsEmailCorrect(false)
            setIsPasswordCorrect(false)
            setErrorMessage('EMPTY_CREDENTIALS')
        }else if(isUsernameCorrect && isEmailCorrect && isPasswordCorrect){
            const verifyNewAccount = context.verifyNewUser(userName,email,password)
            if(verifyNewAccount.username && verifyNewAccount.email && verifyNewAccount.password){
                const newAccount = {
                    username: userName,
                    email: email,
                    password: password
                  }
                context.saveNewAccount(newAccount)
                context.saveSignIn(true)
                navigate('/')
            }else setErrorMessage(verifyNewAccount.errorMessage)
        }else{
            setErrorMessage('INCORRECT_CREDENTIALS')
        }
    }
    const verifyUsername = (username)=>{
        setUserName(username)
        const regex = /^[A-Za-z][A-Za-z0-9]{3,}$/
        if(!regex.test(username) && username !==''){
            setIsUsernameCorrect(false)
            if(!badCredentials?.find(credential => credential === 'username')){
                const newBadCredentials = [...badCredentials,'username']
                setBadCredentials(newBadCredentials)
            }
        }else{
            setIsUsernameCorrect(true)
            const newBadCredentials = badCredentials.filter(credential => credential !== 'username')
            setBadCredentials(newBadCredentials)
        }
    }

    const verifyEmail = (email)=>{
        setEmail(email)
        const regex = /^[0-9A-Za-z]{1,15}@[a-z]{1,10}\.[a-z]{2,3}\.?[a-z]{0,3}$/
        if(!regex.test(email) && email !==''){
            setIsEmailCorrect(false)
            if(!badCredentials?.find(credential => credential === 'email')){
                const newBadCredentials = [...badCredentials,'email']
                setBadCredentials(newBadCredentials)
            }
        }else{
            setIsEmailCorrect(true)
            const newBadCredentials = badCredentials.filter(credential => credential !== 'email')
            setBadCredentials(newBadCredentials)
        }
    }

    const verifyPassword = (password)=>{
        setPassword(password)
        const regex = /(?=(.*[A-Z]))(?=(.*[0-9]))/
        if(password.length<4 && password!==''){
            setIsPasswordCorrect(false)
            if(!badCredentials?.find(credential => credential === 'password_2')){
                const newBadCredentials = [...badCredentials.filter(credential => credential !== 'password_1'),'password_2']
                setBadCredentials(newBadCredentials)
            }
        }else if(password.length>=4 && !regex.test(password)){

            setIsPasswordCorrect(false)
            if(!badCredentials?.find(credential => credential === 'password_1')){
                const newBadCredentials = [...badCredentials.filter(credential => credential !== 'password_2'),'password_1']
                setBadCredentials(newBadCredentials)
            }
        }else{
            setIsPasswordCorrect(true)
            const newBadCredentials = badCredentials.filter(credential => credential !== 'password_1' && credential !== 'password_2')
            setBadCredentials(newBadCredentials)
        }
    }

    const renderBadCredential = (credential) => {
        if(badCredentials?.find(cred => cred === credential)){
            if(credential === 'username'){
                return (
                    <p className='text-xs text-red-500'>** Username should have at least 4 characters</p>
                )
            }else if(credential === 'email'){
                return (
                    <p className='text-xs text-red-500'>** Not valid email, example: platzi@example.com</p>
                )
            }else if (credential === 'password_1'){
                return (
                    <p className='text-xs text-red-500'>** Password must have capital letters and numbers</p>
                )
            }else if(credential === 'password_2'){
                return (
                    <p className='text-xs text-red-500'>** Password must have at least 4 characters</p>
                )
            }
        }else return (<></>)
    }
    const renderErrorMesage = () => {
        switch(errorMessage){
            case 'EMPTY_CREDENTIALS':
                return (<p className='text-red-500'>All the fields have to be setted</p>)
            case 'EMAIL_EXISTS':
                return (<p className='text-red-500'>The email is already used</p>)
            case 'USERNAME_EXISTS':
                return (<p className='text-red-500'>The username is already used</p>)
            case 'INCORRECT_CREDENTIALS':
                return (<p className='text-red-500'>Incorrect credentials</p>)
            default: 
                return (<></>)
        }
    }
    return (
        <Layout>
            <div className='flex flex-col items-center w-80 gap-4 px-4'>
                <h1 className='font-medium text-xl mb-2'>Sign Up</h1>
                <div className='flex flex-col w-full'>
                    <span className='font-light'>
                        Username: 
                    </span>
                    <input className='w-full mt-1 border border-black rounded-sm bg-gray-100 p-2 font-light' type='text' placeholder='platzi123' onChange={(event)=>verifyUsername(event.target.value)}/>
                    {renderBadCredential('username')}
                </div>
                <div className='flex flex-col w-full'>
                    <span className='font-light'>
                        Email: 
                    </span>
                    <input className='w-full mt-1 border border-black rounded-sm bg-gray-100 p-2 font-light' type='text' placeholder='platzi@example.com' onChange={(event)=>verifyEmail(event.target.value)}/>
                    {renderBadCredential('email')}
                </div>
                <div className='flex flex-col w-full'>
                    <span className='font-light'>
                        Password: 
                    </span>
                    <input className='w-full mt-1 border border-black rounded-sm bg-gray-100 p-2 font-light' type='text' placeholder='********' onChange={(event)=>verifyPassword(event.target.value)}/>
                    {renderBadCredential('password_1')}
                    {renderBadCredential('password_2')}
                </div>
                <button className='bg-black w-full text-white p-3 rounded-md mt-3' onClick={()=>handleSignUp()}>
                    Sign up
                </button>
                {renderErrorMesage()}
            </div>
        
        </Layout>
    )
}

export {SignUp}