import {Card} from "../../Components/Card"
import {Layout} from "../../Components/Layout"
import { ProductDetail } from "../../Components/ProductDetail"
import { ShoppingContext } from "../../Context"
import { useContext } from "react"
function Home() {
  const context = useContext(ShoppingContext)
  const renderView = () => {
      if(context.filteredItems?.length > 0){
        return (
          context.filteredItems?.map((item)=>(<Card key={item.id} data={item}/>))  
        )
      }else{
        return(<p>No products founded😥</p>)
      }
  }
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
        <div className='grid lg:gap-4 lg:grid-cols-4 lg:w-full lg:max-w-screen-lg
        max-lg:grid-cols-3 max-lg:max-w-screen-md max-lg:gap-6 max-lg:w-4/5
        max-md:w-4/5 max-md:gap-2'>
          {renderView()}
        </div>
        <ProductDetail/>
      </Layout>
  )
}

export {Home}
