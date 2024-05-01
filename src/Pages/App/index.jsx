import {useRoutes,BrowserRouter} from 'react-router-dom' //Import of the custom hook of react router dom
// import { useContext } from 'react'
import {Home} from '../Home'
import MyAccount from '../MyAccount'
import {MyOrder} from '../MyOrder'
import {MyOrders} from '../MyOrders'
import {NotFound} from '../NotFound'
import SignIn from '../SignIn'
import {SignUp} from '../SignUp'
import { Navbar } from '../../Components/Navbar'
import { CheckoutSideMenu } from '../../Components/CheckoutSideMenu'
import { ShoppingContextProvider,ShoppingContext } from '../../Context'
import { useContext,useState } from 'react'

//En la función AppRoutes se guardan las rutas que se retornan 
//de la función useRoutes
const AppRoutes = ()=>{
  const context = useContext(ShoppingContext)
  const isSignedIn = context.signIn
  //La variable routes guarda todas las rutas y coloca el componente 
  //sobre cada ruta
  let routes = useRoutes([
    { path: '/',element: isSignedIn ? <Home />:<SignIn />},
    { path: '/clothes',element: isSignedIn ? <Home />:<SignIn />},
    { path: '/electronics',element: isSignedIn ? <Home />:<SignIn />},
    { path: '/furnitures',element: isSignedIn ? <Home />:<SignIn />},
    { path: '/toys',element: isSignedIn ? <Home />:<SignIn />},
    { path: '/others',element: isSignedIn ? <Home />:<SignIn />},
    { path: '/my-account',element: isSignedIn ? <MyAccount />: <SignIn />},
    { path: '/my-order',element: isSignedIn ? <MyOrder />:<SignIn />},
    { path: '/my-orders',element: isSignedIn ? <MyOrders />: <SignIn />},
    { path: '/my-orders/last',element: isSignedIn ? <MyOrder />: <SignIn />},
    { path: '/my-orders/:id',element: isSignedIn ?  <MyOrder />: <SignIn />},
    { path: '/sign-in',element: isSignedIn ? <MyAccount />:<SignIn />}, 
    { path: '/sign-up',element: <SignUp />},
    { path: '/*',element: <NotFound />},
  ])
  return routes
}


function App() {
  return (
      <ShoppingContextProvider>
        <BrowserRouter> 
        <AppRoutes/>
        <Navbar/>
        <CheckoutSideMenu/>
        </BrowserRouter>
      </ShoppingContextProvider>  
  )
}

export default App
