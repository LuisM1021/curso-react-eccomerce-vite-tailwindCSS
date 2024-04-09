import { Layout } from "../../Components/Layout"
import { useContext } from "react"
import { ShoppingContext } from "../../Context"
import { OrderCard } from "../../Components/OrderCard"
import { Link } from "react-router-dom"
import { ChevronLeftIcon } from "@heroicons/react/24/outline"

function MyOrder() {
  const context = useContext(ShoppingContext)
    return (
      <Layout>
        <div className='flex items-center justify-center w-80 relative mb-6'>
          <Link to='/my-orders' className='absolute left-0'>
            <ChevronLeftIcon className='h-6 w-6 text-black cursor-pointer'/>
          </Link>
          <h1>My Orders</h1>
        </div>
        <div>
          {
            context.order?.slice(-1)[0].products.map(product=>{
                return <OrderCard 
                key={product.id}
                id={product.id}
                title={product.title}
                imgUrl={product.images[0]}
                price={product.price}
                />
            })
          } 
        </div>
      </Layout>
  )
}

export {MyOrder}