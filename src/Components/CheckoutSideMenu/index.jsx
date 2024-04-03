import { useContext } from 'react'
import {XMarkIcon} from '@heroicons/react/24/outline'
import {ShoppingContext} from '../../Context'
function CheckoutSideMenu(){
    const context = useContext(ShoppingContext)
    return(
        <aside className={`${context.isCheckoutSideMenuOpen ? 'flex' : 'hidden'} flex-col fixed right-0 border border-black rounded-lg bg-white w-[360px] h-[calc(100vh-68px)] top-16`}>
            <div className='flex justify-between item-center p-6'>
                <h2 className='font-medium text-xl'>My Order</h2>
                <div className='flex justify-center items-center bg-black/10 w-10 h-10 rounded-full cursor-pointer'
                onClick={()=>context.closeCheckoutSideMenu()}><XMarkIcon className='w-8 h-8'/></div>
            </div>
        </aside>
    )
}

export {CheckoutSideMenu}