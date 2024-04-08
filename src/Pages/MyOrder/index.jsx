import { Layout } from "../../Components/Layout"
import { useContext } from "react"
import { ShoppingContext } from "../../Context"
import { OrderCard } from "../../Components/OrderCard"

function MyOrder() {
  const context = useContext(ShoppingContext)
    return (
      <Layout>
        My order
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