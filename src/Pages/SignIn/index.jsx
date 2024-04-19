import { Layout } from "../../Components/Layout"
import { useContext } from "react"
import { ShoppingContext } from "../../Context"

function SignIn() {
  const context = useContext(ShoppingContext)
  const prueba=()=>{
    const newAccount = {
      username: 'Luis',
      email: 'lmurallesp@platzi.com',
      password: '12345678'
    }
    context.saveNewAccount(newAccount)
  }
  const renderUserData = () =>{
    console.log(context.account)
    if(context.account){
      return (
        <>
          <p><span className='font-light'>Email:</span> <span>{context.account[0].email}</span></p>
          <p><span className='font-light'>Password:</span> <span>{context.account[0].password}</span></p>
        </>
      )
    }else{
      return (
        <>
          <p><span className='font-light'>Email:</span> <input type="text" placeholder='example@platzi.com'/></p>
          <p><span className='font-light'>Password:</span> <input type="text" placeholder='********'/></p>
        </>
      )
    }
  }
    return (
      <Layout>
        {context.signIn ? 
        <div>
        info de usuario y logout
        </div>:
        <div className='flex flex-col w-80 items-center gap-4'>
          <h1 className='font-medium text-xl mb-2'>Welcome</h1>
          <div className='w-full flex flex-col'>
           {renderUserData()}
          </div>
          <button className='bg-black rounded-md text-white w-full p-3' onClick={()=>prueba()}>Log in</button>
          <a href="/" className='underline underline-offset-4 text-xs'>Forgot my password</a>
          <button className='w-full border-2 border-black rounded-md p-3 mt-3'>Sign up</button>
        </div>}
      </Layout>
  )
}

export default SignIn