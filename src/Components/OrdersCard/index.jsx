function OrdersCard({totalPrice,totalProducts}){
    
    return(
        <div className='flex justify-between items-center mb-3 w-64 border border-black px-2 py-1 rounded-lg'>
            <p className='flex justify-between w-full items-center'>
                <div className='flex flex-col items-center'>
                    <span>01.02.23</span>
                    {totalProducts === 1 ?
                     <span>{totalProducts} article</span>:
                     <span>{totalProducts} articles</span>}
                    
                </div>
                <span className='font-bold text-lg'>${totalPrice}</span>
            </p>
        </div>
    )
}

export {OrdersCard}