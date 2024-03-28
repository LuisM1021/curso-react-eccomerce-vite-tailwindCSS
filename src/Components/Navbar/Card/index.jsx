function Card(data){
    return(
        <div className="bg-white cursor-pointer w-56 h-60 rounded-lg">
            <figure className='relative mb-4 w-full h-4/5'>
                <span className="absolute bottom-0 left-0 bg-white/60 rounded-lg text-black text-xs m-2 px-3 py-0.5">{data.data.category.name}</span>
                <img className='w-full h-full object-cover rounded-lg' src={data.data.images[0]} alt={data.data.title} />
                <div className='absolute top-0 right-0 flex items-center justify-center bg-white w-6 h-6 rounded-full m-2 p-1'>
                    <span className='mb-1'>+</span>
                    </div>
            </figure>
            <p className="flex justify-between">
                <span className='text-sm font-light'>{data.data.title}</span>
                <span className='text-lg font-medium'>${data.data.price}</span>
            </p>
        </div>
    )
}

export {Card};