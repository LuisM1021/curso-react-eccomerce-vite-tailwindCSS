import { useContext } from 'react'
import {XMarkIcon} from '@heroicons/react/24/outline'
import {ShoppingContext} from '../../Context'
import { OrderCard } from '../OrderCard'
import { totalPrice } from '../../Utils'
function CheckoutSideMenu(){
    const context = useContext(ShoppingContext)

    const deleteCartProduct = (id) => {
        const filteredProducts = context.cartProducts.filter(product => product.id !== id)
        context.setCartProducts(filteredProducts)
        // context.setCount(count=>(count-1))
    }
    const handleCheckout =()=>{
        const orderToAdd = {
            date: '06-04-24',
            products: context.cartProducts,
            totalProducts: context.cartProducts.length,
            totalPrice: totalPrice(context.cartProducts)
        }
        context.setOrder([...context.order,orderToAdd])
        context.setCartProducts([])
    }
    return(
        <aside className={`${context.isCheckoutSideMenuOpen ? 'flex' : 'hidden'} flex-col fixed right-0 border border-black rounded-lg bg-white w-[360px] h-[calc(100vh-68px)] top-16`}>
            <div className='flex justify-between item-center p-6'>
                <h2 className='font-medium text-xl'>My Order</h2>
                <div className='flex justify-center items-center bg-black/10 w-10 h-10 rounded-full cursor-pointer'
                onClick={()=>context.closeCheckoutSideMenu()}><XMarkIcon className='w-8 h-8'/></div>
            </div>
            <div className='px-6 overflow-y-scroll flex-1'>
                {
                    context.cartProducts.map(product=>{
                        return <OrderCard 
                        key={product.id}
                        id={product.id}
                        title={product.title}
                        imgUrl={product.images[0]}
                        price={product.price}
                        deleteCartProduct={deleteCartProduct}/>
                    })
                }
            </div>
            <div className='px-6 mb-6'>
                <p className='flex justify-between items-center mb-2'>
                    <span className='font-light'>Total:</span>
                    <span className='font-medium text-2xl'>${totalPrice(context.cartProducts)}</span>
                </p>
                <button className='bg-black py-3 text-white w-full rounded-lg' onClick={()=>handleCheckout()}>Checkout</button>
            </div>
        </aside>
    )
}

export {CheckoutSideMenu}