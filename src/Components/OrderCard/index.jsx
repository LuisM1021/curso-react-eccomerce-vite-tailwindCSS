import { XMarkIcon } from "@heroicons/react/24/outline"
function OrderCard({id,title,imgUrl,price,deleteCartProduct}){
    return(
        <div className='flex justify-between items-center mb-3'>
            <div className='flex items-center gap-2'>
                <figure className='w-20 h-20'>
                    <img className='w-full h-full rounded-lg object-cover' src={imgUrl} alt={title} />
                </figure>
                <p className='text-sm font-light '>{title}</p>
            </div>
            <div className='flex items-center gap-2'>
                <p className='text-lg font-medium'>{price}</p>
                <XMarkIcon onClick={()=>deleteCartProduct(id)} className='h-6 w-6 text-black cursor-pointer'/>
            </div>
        </div>
    )
}

export {OrderCard}