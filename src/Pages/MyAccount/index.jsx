import { Layout } from "../../Components/Layout"
import { useContext, useState } from "react"
import { ShoppingContext } from "../../Context"
function MyAccount() {
  const context = useContext(ShoppingContext)
  const [accountRender,setAccountRender] = useState('ACCOUNT')
  const [editedPassword,setEditedPassword] = useState('')
  const [editedName,setEditedName] = useState('')
  const [isUsernameCorrect,setIsUsernameCorrect] = useState(false)
  const [isPasswordCorrect,setIsPasswordCorrect] = useState(false)
  const [badCredentials,setBadCredentials] = useState([])
  const [errorMessage,setErrorMessage] = useState(null)

  const handleLogOut = () => {
    context.saveSignIn(false)
  }
  const handleEdit = () => {
    if(editedName === '' || editedPassword === ''){
      setIsUsernameCorrect(false)
      setIsPasswordCorrect(false)
      setErrorMessage('EMPTY_CREDENTIALS')
  }else if(isUsernameCorrect && isPasswordCorrect){
      const verifyNewAccount = context.verifyEditedUser(editedName,context.currentAccount[0].username,context.currentAccount[0].email,editedPassword)
      if(verifyNewAccount.username && verifyNewAccount.email && verifyNewAccount.password){
          const editedAccount = {
          username: editedName,
          email: context.currentAccount[0].email,
          password: editedPassword
          }
          context.editAccount(editedAccount)
          setEditedPassword('')
          setEditedName('')
          setErrorMessage(null)
          setAccountRender('ACCOUNT')
      }else setErrorMessage(verifyNewAccount.errorMessage)
  }else{
      setErrorMessage('INCORRECT_CREDENTIALS')
  } 
  }

  const verifyUsername = (username)=>{
    setEditedName(username)
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
  const verifyPassword = (password)=>{
    setEditedPassword(password)
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
          <button className='w-full border-2 border-black text-black font-medium rounded-md mt-4 p-2' onClick={()=>setAccountRender('EDIT_ACCOUNT')}>
            Edit
          </button>
          <button className='w-full bg-red-600 p-3 text-white font-medium rounded-md' onClick={()=>handleLogOut()}>
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
          <div className='w-full flex flex-col gap-2'>
            <span className='font-light'>Username</span>
            <input className=' bg-orange-50 p-2 rounded-md' onChange={(event)=>verifyUsername(event.target.value)} placeholder={context.currentAccount && context.currentAccount[0]?.username}></input>
            {renderBadCredential('username')}
          </div>
          <div className='w-full flex flex-col gap-2'>
            <span className='font-light'>Password</span>
            <input className='bg-orange-50 p-2 rounded-md' onChange={(event)=>verifyPassword(event.target.value)} placeholder={context.currentAccount && context.currentAccount[0]?.password}></input>
            {renderBadCredential('password_1')}
            {renderBadCredential('password_2')}
          </div>
          <button className='w-full border-2 border-black text-black font-medium rounded-md mt-4 p-2' onClick={()=>handleEdit()}>
            Edit
          </button>
          {renderErrorMesage()}
        </div>
    )
    
  }
  const renderBadCredential = (credential) => {
    if(badCredentials?.find(cred => cred === credential)){
        if(credential === 'username'){
            return (
                <p className='text-xs text-red-500'>** Username should have at least 4 characters</p>
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
          return (<p className='text-red-500 text-center'>All the fields have to be setted</p>)
      case 'USERNAME_EXISTS':
          return (<p className='text-red-500 text-center'>The username is already used</p>)
      case 'INCORRECT_CREDENTIALS':
          return (<p className='text-red-500 text-center'>Incorrect credentials</p>)
      default: 
          return (<></>)
  }
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