import { XMarkIcon } from "@heroicons/react/24/outline"
function OrderCard({id,title,imgUrl,price,deleteCartProduct}){
    let renderXMarkIcon
    if(deleteCartProduct){
        renderXMarkIcon = 
        <XMarkIcon onClick={()=>deleteCartProduct(id)} className='h-6 w-6 text-black cursor-pointer max-sm:w-4 max-sm:h-4'/>
    }
    return(
        <div className='flex justify-between items-center mb-3'>
            <div className='flex items-center gap-2'>
                <figure className='w-20 h-20 max-sm:w-10 max-sm:h-10'>
                    <img className='w-full h-full rounded-lg object-cover' src={imgUrl} alt={title} />
                </figure>
                <p className='text-sm font-light max-sm:text-xs'>{title}</p>
            </div>
            <div className='flex items-center gap-2'>
                <p className='text-lg font-medium max-sm:text-sm'>{price}</p>
                {renderXMarkIcon}
            </div>
        </div>
    )
}

export {OrderCard}