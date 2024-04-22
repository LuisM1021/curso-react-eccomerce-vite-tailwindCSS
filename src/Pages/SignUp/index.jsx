import { Layout } from "../../Components/Layout"
import { useNavigate } from "react-router-dom"
import { useContext, useState } from "react"
import { ShoppingContext } from "../../Context"
function SignUp(){
    const context = useContext(ShoppingContext)
    const navigate = useNavigate()
    const [userName,setUserName] = useState('') 
    const [email,setEmail] = useState('') 
    const [password,setPassword] = useState('') 
    const handleSignUp = () =>{
        const verifyNewAccount = context.verifyNewUser(userName,email,password)
        if(verifyNewAccount.username && verifyNewAccount.email && verifyNewAccount.password){
            const newAccount = {
                username: userName,
                email: email,
                password: password
              }
            context.saveNewAccount(newAccount)
            navigate('/')
        }
    }
    return (
        <Layout>
            <div className='flex flex-col items-center w-80 gap-4 px-4'>
                <h1 className='font-medium text-xl mb-2'>Sign Up</h1>
                <p className='flex w-full items-center justify-between self-start'>
                    <span className='font-light'>
                        Username: 
                    </span>
                    <input className='w-52 rounded-sm bg-gray-100 p-1 font-light' type='text' placeholder='platzi123' onChange={(event)=>setUserName(event.target.value)}/>
                </p>
                <p className='flex w-full items-center justify-between self-start'>
                    <span className='font-light'>
                        Email: 
                    </span>
                    <input className='w-52 rounded-sm bg-gray-100 p-1 font-light' type='text' placeholder='platzi@example.com' onChange={(event)=>setEmail(event.target.value)}/>
                </p>
                <p className='flex w-full items-center justify-between self-start'>
                    <span className='font-light'>
                        Password: 
                    </span>
                    <input className='w-52 rounded-sm bg-gray-100 p-1 font-light' type='text' placeholder='********' onChange={(event)=>setPassword(event.target.value)}/>
                </p>
                <button className='bg-black w-full text-white p-3 rounded-md mt-3' onClick={()=>handleSignUp()}>
                    Sign up
                </button>
            </div>
        
        </Layout>
    )
}

export {SignUp}