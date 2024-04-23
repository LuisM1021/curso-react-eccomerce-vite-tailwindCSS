import { Layout } from "../../Components/Layout"
import { useContext } from "react"
import { ShoppingContext } from "../../Context"
function MyAccount() {
  const context = useContext(ShoppingContext)
  const handleClick = () => {
    context.saveSignIn(false)
  }
    return (
      <Layout>
        <div className='w-80 flex flex-col gap-4'>
          <h1 className='self-center text-xl font-medium mb-2'>
            Account details
          </h1>
          <p className='w-full flex flex-col gap-2'>
            <span className='font-light'>Username</span>
            <span className='bg-orange-50 p-2'>{context.account[0]?.username}</span>
          </p>
          <p className='w-full flex flex-col gap-2'>
            <span className='font-light'>Email</span>
            <span className='bg-orange-50 p-2 rounded-md'>{context.account[0]?.email}</span>
          </p>
          <p className='w-full flex flex-col gap-2'>
            <span className='font-light'>Password</span>
            <span className='bg-orange-50 p-2'>{context.account[0]?.password}</span>
          </p>
          <button className='w-full bg-red-600 p-3 text-white font-medium rounded-md mt-4' onClick={()=>handleClick()}>
            Log Out
          </button>
        </div>
      </Layout>
  )
}

export default MyAccount