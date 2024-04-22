import { Layout } from '../../Components/Layout'
import { useContext,useState } from 'react'
import { ShoppingContext } from '../../Context'
import { NavLink,useNavigate } from 'react-router-dom'

function SignIn() {
  const context = useContext(ShoppingContext)
  const navigate = useNavigate()
  let initialUserEmail = ''
  let initialUserPassword = ''
  if(context.account?.length>0){
    initialUserEmail = context.account[0].email
    initialUserPassword = context.account[0].password
  }
  const [userEmail,setUserEmail] = useState(initialUserEmail)
  const [userPassword,setUserPassword] = useState(initialUserPassword)
  const [verifyingError,setVerifyingError] = useState(null)
  const [routeToGo,setRouteToGo] = useState('.')
  const prueba=()=>{
    const newAccount = {
      username: 'Luis',
      email: 'lmurallesp@platzi.com',
      password: '12345678'
    }
    context.saveNewAccount(newAccount)
  }
  const renderUserData = () =>{
    if(context.account?.length>0){
      return (
        <>
          <p><span className='font-light'>Email:</span> <input type='text' defaultValue={context.account[0].email} onChange={(event)=>setUserEmail(event.target.value)}/></p>
          <p><span className='font-light'>Password:</span> <input type='text' defaultValue={context.account[0].password} onChange={(event)=>setUserPassword(event.target.value)}/></p>
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
      <p>{verifyingError}</p>
      )
    }else{
      return (<></>)
    }
  }
  const handleLogIn = () => {
    const verify = context.verifyCredentials(userEmail,userPassword)
    if(verify[1] === 'VERIFIED'){
      setVerifyingError(null)
      setRouteToGo(verify[0])
    } 
    else{
      setVerifyingError(verify[1])
      setRouteToGo(verify[0])
    } 
  }
  const handleClick = (route) =>{
    navigate(route)
  }
    return (
      <Layout>
        {context.signIn ? 
        <div>
        info de usuario y logout
        </div>:
        <div className='flex flex-col w-80 items-center gap-4'>
          <h1 className='font-medium text-xl mb-2'>Welcome {context.account && context.account[0].username}</h1>
          <div className='w-full flex flex-col'>
           {renderUserData()}
          </div>
          {renderVerifyError()}
          <NavLink onClick={()=>handleLogIn()} to={routeToGo} className='bg-black rounded-md text-white w-full p-3 text-center'>
            Log in
          </NavLink> 
          <a href='/' className='underline underline-offset-4 text-xs'>Forgot my password</a>
          <button onClick={()=>handleClick('/sign-up')}  className='w-full border-2 border-black rounded-md p-3 mt-3'>Sign up</button>
        </div>}
      </Layout>
  )
}

export default SignIn