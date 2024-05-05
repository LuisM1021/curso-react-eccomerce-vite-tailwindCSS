import { useContext } from "react";
import { ShoppingContext } from "../../Context";
import { Bars3Icon } from "@heroicons/react/24/solid";

function Layout({children}){
    const context = useContext(ShoppingContext)
    return(
        <div className='flex flex-col lg:mt-20 items-center max-lg:mt-6'>
            <p className={`max-lg:text-2xl max-lg:p-4
            lg:hidden max-lg:font-semibold max-lg:top-0 max-lg:left-0 max-lg:cursor-pointer
             ${context.responsiveDisplayNavbar ? 'max-lg:hidden':'max-lg:fixed'}`}
                onClick={()=>context.setResponsiveDisplayNavbar(true)}>
                <Bars3Icon className='max-lg:w-8 max-lg:h-8'/>
            </p>
            {children}
        </div>
    )
}
export {Layout};