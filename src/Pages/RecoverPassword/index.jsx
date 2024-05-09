import { useContext, useState } from "react"
import { Layout } from "../../Components/Layout"
import { ShoppingContext } from "../../Context"
import { EyeIcon } from "@heroicons/react/24/outline"
import { useNavigate } from "react-router-dom"

function RecoverPassword(){
    const context = useContext(ShoppingContext)
    const navigate = useNavigate()
    let initialPasswordValue = ''
    if(context.lastLogedAccount){
        for(let i = 0;i<context.lastLogedAccount[0]?.password.length;i++){
            initialPasswordValue += '*'
        }
    }
    const [password,setPassword] = useState(initialPasswordValue)
    const renderPassword = () => {
        if(context.lastLogedAccount) setPassword(context.lastLogedAccount[0]?.password)
    }
    const handleLogIn = () => {
        const verify = context.verifyCredentials(context.lastLogedAccount[0]?.email,context.lastLogedAccount[0]?.password)
        if(verify === 'VERIFIED'){
          context.saveSignIn(true)
          navigate('/')
        } 
      }
    return (
        <Layout>
            <div className='w-80 flex flex-col gap-4'>
          <h1 className='self-center text-xl font-medium mb-2'>
            Account details
          </h1>
          <p className='w-full flex flex-col gap-2'>
            <span className='font-light'>Email</span>
            <span className='bg-orange-100 p-2 rounded-md'>{context.lastLogedAccount && context.lastLogedAccount[0]?.email}</span>
          </p>
          <p className='w-full flex flex-col gap-2'>
            <span className='font-light'>Username</span>
            <span className=' bg-orange-50 p-2 rounded-md'>{context.lastLogedAccount && context.lastLogedAccount[0]?.username}</span>
          </p>
          <div className='relative w-full flex flex-col gap-2'>
            <span className='font-light'>Password</span>
            <div className='w-full h-10 relative bg-orange-50 p-2 rounded-md'>
                <span>{password}</span>
                <EyeIcon onClick={()=>renderPassword()} className='absolute w-5 h-5 top-1/2 transform -translate-y-1/2 right-2 cursor-pointer'/>
            </div>
          </div>
          <button className='w-full border-2 border-black text-black font-medium rounded-md mt-4 p-2' onClick={()=>handleLogIn()}>
            Log in
          </button>
        </div>
        </Layout>
    )
}
export {RecoverPassword}