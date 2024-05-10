import { ChevronRightIcon } from "@heroicons/react/24/outline"
function OrdersCard({totalPrice,totalProducts}){
    const renderDate = () => {
        const time = new Date()
        let day = time.getDate()
        let month = time.getMonth() + 1
        let year = time.getFullYear()
        if(day < 10) day = `0${day}`
        if(month < 10) month = `0${month}`
        year = year-2000
        return(
            <span>
                {day}.{month}.{year}
            </span>
        )
    }
    return(
        <div className='flex justify-between items-center mb-3 w-80 border border-black p-4 rounded-lg'>
            <div className='flex justify-between w-full items-center'>
                <p className='flex flex-col items-center'>
                    {renderDate()}
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