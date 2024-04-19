import { Layout } from "../../Components/Layout"
import { useContext } from "react"
import { ShoppingContext } from "../../Context"

function SignIn() {
  const context = useContext(ShoppingContext)
    return (
      <Layout>
        {context.signIn ? 
        <div>
        info de usuario y logout
        </div>:
        <div className='flex flex-col w-80 items-center gap-4'>
          <h1 className='font-medium text-xl mb-2'>Welcome</h1>
          <div className='w-full flex flex-col'>
            <p><span className='font-light'>Email:</span> <span>luis@platzi.com</span></p>
            <p><span className='font-light'>Password:</span> <span>********</span></p>
          </div>
          <button className='bg-black rounded-md text-white w-full p-3'>Log in</button>
          <a href="/" className='underline underline-offset-4 text-xs'>Forgot my password</a>
          <button className='w-full border-2 border-black rounded-md p-3 mt-3'>Sign up</button>
        </div>}
      </Layout>
  )
}

export default SignIn