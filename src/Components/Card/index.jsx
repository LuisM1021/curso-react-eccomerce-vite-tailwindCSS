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
                <div className='absolute top-0 right-0 flex items-center justify-center bg-green-400 w-6 h-6 rounded-full m-2 p-1'
                    >
                    <CheckIcon className='h-4 w-4 text-green-700'/>
                </div>
            )
        }else{
            return (
                <div className='absolute top-0 right-0 flex items-center justify-center bg-white w-6 h-6 rounded-full m-2 p-1'
                    onClick={(event)=>addProductToCart(event)}>
                        <PlusIcon className='h-4 w-4'/>
                        </div>
            )
        }
    }


    return(
        <div 
            className="bg-white cursor-pointer w-56 h-60 rounded-lg"
            onClick={()=>showProduct()}>
            <figure className='relative mb-4 w-full h-4/5'>
                <span className="absolute bottom-0 left-0 bg-white/60 rounded-lg text-black text-xs m-2 px-3 py-0.5">{data.data.category.name}</span>
                <img className='w-full h-full object-cover rounded-lg' src={data.data.images[0]} alt={data.data.title} />
                {renderIcon()}
            </figure>
            <p className="flex justify-between">
                <span className='text-sm font-light'>{data.data.title}</span>
                <span className='text-lg font-medium'>${data.data.price}</span>
            </p>
        </div>
    )
}

export {Card};