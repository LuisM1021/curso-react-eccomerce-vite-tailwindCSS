// import {useRoutes} from 'react-router-dom' //Import of the custom hook of react router dom
import Home from '../Home'
import MyAccount from '../MyAccount'
import MyOrder from '../MyOrder'
import MyOrders from '../MyOrders'
import NotFound from '../NotFound'
import SignIn from '../SignIn'

import './App.css'

function App() {
  // let r
    return (
      <div className='bg-red-100'>
        <Home/>
        <MyAccount/>
        <MyOrder/>
        <MyOrders/>
        <NotFound/>
        <SignIn/>
      </div>
  )
}

export default App
