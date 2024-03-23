import {useRoutes,BrowserRouter} from 'react-router-dom' //Import of the custom hook of react router dom
import Home from '../Home'
import MyAccount from '../MyAccount'
import MyOrder from '../MyOrder'
import MyOrders from '../MyOrders'
import NotFound from '../NotFound'
import SignIn from '../SignIn'

import './App.css'

//En la función AppRoutes se guardan las rutas que se retornan 
//de la función useRoutes
const AppRoutes = ()=>{
  //La variable routes guarda todas las rutas y coloca el componente 
  //sobre cada ruta
  let routes = useRoutes([
    { path: '/',element: <Home />},
    { path: '/my-account',element: <MyAccount />},
    { path: '/my-order',element: <MyOrder />},
    { path: '/my-orders',element: <MyOrders />},
    { path: '/sign-in',element: <SignIn />},
    { path: '/*',element: <NotFound />},
  ])
  return routes
}

function App() {
  
    return (
      <BrowserRouter> 
        <AppRoutes/>
      </BrowserRouter>
  )
}

export default App
