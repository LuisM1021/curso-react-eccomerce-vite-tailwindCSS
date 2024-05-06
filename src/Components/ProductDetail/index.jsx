// import './styles.css'
import { useContext } from 'react'
import {XMarkIcon} from '@heroicons/react/24/outline'
import {ShoppingContext} from '../../Context'
function ProductDetail(){
    const context = useContext(ShoppingContext)
    return(
        <aside className={`${context.isProductDetailOpen ? 'flex' : 'hidden'} product-detail flex-col fixed right-0 border border-black rounded-lg bg-white overflow-auto z-20
         max-lg:w-3/5 max-lg:h-full max-lg:top-0
         lg:w-[360px] lg:h-[calc(100vh-68px)] lg:top-16`}>
            <div className='flex justify-between item-center p-6'>
                <h2 className='font-medium text-xl'>Detail</h2>
                <div className='flex justify-center items-center bg-black/10 w-10 h-10 rounded-full cursor-pointer'
                onClick={()=>context.closeProductDetail()}><XMarkIcon className='w-8 h-8'/></div>
            </div>
            <figure className='px-6'>
                <img 
                    className='w-full h-full rounded-lg' 
                    src={context.productToShow.images[0]} 
                    alt={context.productToShow.title} />
            </figure>
            <p className='flex flex-col p-6'>
                <span className='font-medium text-2xl mb-2'>${context.productToShow.price}</span>
                <span className='font-medium text-md'>{context.productToShow.title}</span>
                <span className='font-light text-sm'>{context.productToShow.description}</span>
            </p>
        </aside>
    )
}

export {ProductDetail}


 

            

