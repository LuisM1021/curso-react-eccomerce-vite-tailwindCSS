import { Layout } from "../../Components/Layout"
import { useContext } from "react"
import { ShoppingContext } from "../../Context"
import { OrderCard } from "../../Components/OrderCard"
import { Link } from "react-router-dom"
import { ChevronLeftIcon } from "@heroicons/react/24/outline"

function MyOrder() {
  const context = useContext(ShoppingContext)
  const currentPath = window.location.pathname
  let index = currentPath.match(/\d+/)
  if(!index) index = context.order?.length -1 
  return (
    <Layout>
      <div className='flex items-center justify-center w-80 relative mb-6'>
        <Link to='/my-orders' className='absolute left-0'>
          <ChevronLeftIcon className='h-6 w-6 text-black cursor-pointer'/>
        </Link>
        <h1>My Order</h1>
      </div>
      <div>
        {
          context.order.length > 0 ?
          context.order?.[index]?.products.map(product=>{
              return <OrderCard 
              key={product.id}
              id={product.id}
              title={product.title}
              imgUrl={product.images[0]}
              price={product.price}
              />
          }) : 
          <p className='mt-2'>Not orders found 😥</p>
        } 
      </div>
    </Layout>
  )
}

export {MyOrder}