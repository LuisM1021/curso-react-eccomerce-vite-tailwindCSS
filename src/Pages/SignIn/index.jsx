import { Layout } from '../../Components/Layout'
import { useContext,useState } from 'react'
import { ShoppingContext } from '../../Context'
import { NavLink,useNavigate } from 'react-router-dom'

function SignIn() {
  const context = useContext(ShoppingContext)
  const navigate = useNavigate()
  let initialUserEmail = ''
  let initialUserPassword = ''
  if(context.lastLogedAccount?.length>0){
    initialUserEmail = context.lastLogedAccount[0].email
    initialUserPassword = context.lastLogedAccount[0].password
  }
  const [userEmail,setUserEmail] = useState(initialUserEmail)
  const [userPassword,setUserPassword] = useState(initialUserPassword)
  const [verifyingError,setVerifyingError] = useState(null)

  const renderUserData = () =>{
    if(context.lastLogedAccount?.length>0){
      return (
        <>
          <p><span className='font-light'>Email:</span> <input type='text' defaultValue={context.lastLogedAccount[0].email} onChange={(event)=>setUserEmail(event.target.value)}/></p>
          <p><span className='font-light'>Password:</span> <input type='text' defaultValue={context.lastLogedAccount[0].password} onChange={(event)=>setUserPassword(event.target.value)}/></p>
        </>
      )
    }else{
      return (
        <>
          <p><span className='font-light'>Email:</span> <input type='text' placeholder='example@platzi.com'/></p>
          <p><span className='font-light'>Password:</span> <input type='text' placeholder='********'/></p>
        </>
      )
    }
  }
  const renderVerifyError = () => {
    if(verifyingError!==null){
      return (
        verifyingError==='NOT_VALID_EMAIL' ? 
        <p className='text-xs text-red-500'>Not valid email</p>:
        <p className='text-xs text-red-500'>Not valid password</p>
      )
    }else{
      return (<></>)
    }
  }
  const handleLogIn = () => {
    const verify = context.verifyCredentials(userEmail,userPassword)
    if(verify === 'VERIFIED'){
      setVerifyingError(null)
      context.saveSignIn(true)
      navigate('/')
    } 
    else{
      setVerifyingError(verify)
    } 
  }
  const handleClick = (route) =>{
    navigate(route)
  }
    return (
      <Layout>
        {!context.signIn &&
          <div className='flex flex-col w-80 items-center gap-4'>
            <h1 className='font-medium text-xl mb-2'>Welcome {context.lastLogedAccount && context.lastLogedAccount[0]?.username}</h1>
            <div className='w-full flex flex-col'>
            {renderUserData()}
            </div>
            {renderVerifyError()}
            <button onClick={()=>handleLogIn()} className='bg-black rounded-md text-white w-full p-3 text-center'>
              Log in
            </button> 
            <NavLink to='/recover-password' className='underline underline-offset-4 text-xs'>Forgot my password</NavLink>
            <button onClick={()=>handleClick('/sign-up')}  className='w-full border-2 border-black rounded-md p-3 mt-3'>Sign up</button>
          </div>
        }
      </Layout>
  )
}

export default SignIn