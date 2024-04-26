import { Layout } from "../../Components/Layout"
import { useContext, useState } from "react"
import { ShoppingContext } from "../../Context"
function MyAccount() {
  const context = useContext(ShoppingContext)
  const [accountRender,setAccountRender] = useState('ACCOUNT')

  // const [editedEmail,setEditedEmail] = useState('')
  const [editedPassword,setEditedPassword] = useState('')
  const [editedName,setEditedName] = useState('')

  const handleLogOut = () => {
    context.saveSignIn(false)
  }
  const handleEdit = () => {
    setAccountRender('ACCOUNT')

    const editedAccount = {
      username: editedName,
      email: context.currentAccount[0].email,
      password: editedPassword
    }
    context.editAccount(editedAccount)
  }
  const renderAccount = () => {
    return (
      <div className='w-80 flex flex-col gap-4'>
          <h1 className='self-center text-xl font-medium mb-2'>
            Account details
          </h1>
          <p className='w-full flex flex-col gap-2'>
            <span className='font-light'>Username</span>
            <span className='bg-orange-50 p-2 rounded-md'>{context.currentAccount && context.currentAccount[0]?.username}</span>
          </p>
          <p className='w-full flex flex-col gap-2'>
            <span className='font-light'>Email</span>
            <span className='bg-orange-50 p-2 rounded-md'>{context.currentAccount && context.currentAccount[0]?.email}</span>
          </p>
          <button className='w-full border-4 border-black text-black font-medium rounded-md mt-4' onClick={()=>setAccountRender('EDIT_ACCOUNT')}>
            Edit
          </button>
          <button className='w-full bg-red-600 p-3 text-white font-medium rounded-md mt-4' onClick={()=>handleLogOut()}>
            Log Out
          </button>
        </div>
    )
  }
  const renderEditAccount = () => {
    return (
      <div className='w-80 flex flex-col gap-4'>
          <h1 className='self-center text-xl font-medium mb-2'>
            Edit Account
          </h1>
          <p className='w-full flex flex-col gap-2'>
            <span className='font-light'>Email</span>
            <span className='bg-orange-100 p-2 rounded-md'>{context.currentAccount && context.currentAccount[0]?.email}</span>
          </p>
          <p className='w-full flex flex-col gap-2'>
            <span className='font-light'>Username</span>
            <input className=' bg-orange-50 p-2 rounded-md' onChange={(event)=>setEditedName(event.target.value)} placeholder={context.currentAccount && context.currentAccount[0]?.username}></input>
          </p>
          <p className='w-full flex flex-col gap-2'>
            <span className='font-light'>Password</span>
            <input className='bg-orange-50 p-2 rounded-md' onChange={(event)=>setEditedPassword(event.target.value)} placeholder={context.currentAccount && context.currentAccount[0]?.password}></input>
          </p>
          <button className='w-full border-4 border-black text-black font-medium rounded-md mt-4' onClick={()=>handleEdit()}>
            Edit
          </button>
        </div>
    )
    
  }
    return (
      <Layout>
        {
          accountRender === 'ACCOUNT' ? 
          renderAccount() : 
          renderEditAccount()
        }
      </Layout>
  )
}

export default MyAccount