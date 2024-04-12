import { ChevronRightIcon } from "@heroicons/react/24/outline"
function OrdersCard({totalPrice,totalProducts}){
    
    return(
        <div className='flex justify-between items-center mb-3 w-80 border border-black p-4 rounded-lg'>
            <div className='flex justify-between w-full items-center'>
                <p className='flex flex-col items-center'>
                    <span>01.02.23</span>
                    {totalProducts === 1 ?
                     <span>{totalProducts} article</span>:
                     <span>{totalProducts} articles</span>}
                    
                </p>
                <p className='flex items-center gap-2'>
                    <span className='font-bold text-lg'>${totalPrice}</span>
                    <ChevronRightIcon className='h-6 w-6 text-black'/>
                </p>
            </div>
        </div>
    )
}

export {OrdersCard}