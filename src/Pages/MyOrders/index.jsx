import { Layout } from "../../Components/Layout"
import { OrdersCard } from "../../Components/OrdersCard"
import { useContext } from "react"
import { ShoppingContext } from "../../Context"
import { Link } from "react-router-dom"

function MyOrders() {
  const context = useContext(ShoppingContext)
    return (
      <Layout>
        <div className='flex items-center justify-center w-80 relative'>
          <h1>My Orders</h1>
        </div>
        {
          context.order?.map((order)=>{
            (
              <Link to={`/my-orders/${order.id}`}>
                <OrdersCard 
                totalPrice={order.totalPrice}
                totalProducts={order.totalProducts}/>
              </Link>
            )
          })
        }
      </Layout>
  )
}

export {MyOrders}