import { useContext } from "react";
import { ShoppingContext } from "../../Context";
import {PlusIcon} from '@heroicons/react/24/solid'
import { CheckIcon } from "@heroicons/react/24/outline";

function Card(data){
    const context = useContext(ShoppingContext)
    const showProduct = () =>{
        context.openProductDetail()
        context.setProductToShow(data.data)
        context.closeCheckoutSideMenu()
    }
    const addProductToCart = (event)=>{
        event.stopPropagation()
        context.closeProductDetail()
        // context.setCount(context.count+1)
        context.setCartProducts([...context.cartProducts,data.data])
        context.openCheckoutSideMenu()
    }
    const renderIcon = ()=>{
        const isInCart = context.cartProducts.filter(product=>product.id === data.data.id).length>0
        if(isInCart){
            return(
                <div className='absolute lg:top-0 lg:right-0 flex items-center justify-center bg-green-400 w-6 h-6 rounded-full m-2 p-1
                max-lg:bottom-0 max-lg:right-0
                max-md:w-4 max-md:h-4 max-md:top-0 max-md:m-1'
                    >
                    <CheckIcon className='h-4 w-4 max-md:w-3 max-md:h-3 text-green-700'/>
                </div>
            )
        }else{
            return (
                <div className='absolute lg:top-0 lg:right-0 flex items-center justify-center bg-white w-6 h-6 rounded-full m-2 p-1
                max-lg:bottom-0 max-lg:right-0
                max-md:w-4 max-md:h-4 max-md:top-0 max-md:right-0 max-md:m-1'
                    onClick={(event)=>addProductToCart(event)}>
                        <PlusIcon className='h-4 w-4 max-md:w-3 max-md:h-3'/>
                        </div>
            )
        }
    }


    return(
        <div 
            className='cursor-pointer lg:w-56 lg:h-60 rounded-lg
            max-lg:w-48 max-lg:h-60 max-lg:relative
            max-md:w-full max-md:h-48 max-md:flex max-md:flex-col max-md:items-center'
            onClick={()=>showProduct()}>
            <figure className='lg:relative lg:mb-4 w-full lg:h-4/5
            max-lg:h-3/5 max-lg:mb-2
            max-md:h-3/4 max-md:mb-1 max-md:relative max-md:w-4/5'>
                <span className="lg:absolute lg:bottom-0 lg:left-0 bg-white/60 rounded-lg text-black text-xs m-2 px-3 py-0.5
                max-lg:absolute max-lg:bottom-24
                max-md:px-1 max-md:py-0 max-md:bottom-0 max-md:m-1">{data.data.category.name}</span>
                <img className='w-full h-full object-cover rounded-lg' src={data.data.images[0]} alt={data.data.title} />
                {renderIcon()}
            </figure>
            <p className='flex lg:justify-between
            max-lg:flex-col max-lg:h-2/5 max-lg:justify-between max-lg:items-center max-lg:gap-4 max-lg:px-1
            max-md:h-1/4 max-md:gap-0'>
                <span className='text-max-lg font-light max-lg:text-center
                max-md:text-xs max-md:h-3/4 max-md:overflow-auto'>{data.data.title}</span>
                <span className='text-lg font-medium max-lg:mb-4 max-lg:ml-2 max-lg:self-start
                max-md:text-xs max-md:self-center max-md:m-0 max-md:h-1/4 max-md:mb-1'>${data.data.price}</span>
            </p>
        </div>
    )
}

export {Card};