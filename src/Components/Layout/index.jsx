import { useContext } from "react";
import { ShoppingContext } from "../../Context";


function Layout({children}){
    const context = useContext(ShoppingContext)
    return(
        <div className='flex flex-col lg:mt-20 items-center max-sm:mt-6'>
            <p className={`lg:hidden max-lg:font-semibold max-lg:text-lg max-lg:top-0 max-lg:left-0 max-lg:cursor-pointer
             ${context.responsiveDisplayNavbar ? 'max-lg:hidden':'max-lg:fixed'}`}
                onClick={()=>context.setResponsiveDisplayNavbar(true)}>
                Shopi
            </p>
            {children}
        </div>
    )
}
export {Layout};