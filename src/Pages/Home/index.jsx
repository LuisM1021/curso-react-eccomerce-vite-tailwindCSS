import {Card} from "../../Components/Card"
import {Layout} from "../../Components/Layout"
import { ProductDetail } from "../../Components/ProductDetail"
import { ShoppingContext } from "../../Context"
import { useContext } from "react"
function Home() {
  const context = useContext(ShoppingContext)
    return (
      <Layout>
        <div className='flex items-center justify-center w-80 relative mb-4'>
          <h1 className='font-medium text-xl'>Exclusive Products</h1>
        </div>
        <input 
        type='text' 
        placeholder='Search a product' 
        className='rounded-lg border border-black w-80 p-4 mb-4 focus:outline-none' 
        onChange={(event)=>context.setSearchByTitle(event.target.value)}/>
        <div className='grid gap-4 grid-cols-4 w-full max-w-screen-lg'>
          {
            context.items?.map((item)=>(<Card key={item.id} data={item}/>))
          }
        </div>
        <ProductDetail/>
      </Layout>
  )
}

export {Home}
