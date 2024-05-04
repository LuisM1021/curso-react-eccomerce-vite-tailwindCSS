import {NavLink} from 'react-router-dom'
import {ShoppingContext} from '../../Context'
import { useContext } from 'react'
import { ShoppingCartIcon } from '@heroicons/react/24/solid'

function Navbar(){
    const activeStyle = 'underline underline-offset-4'
    const context = useContext(ShoppingContext)
    const handleResponsiveDisplay = () => {
        context.setSearchByCategory()
        context.setResponsiveDisplayNavbar(false)
    }
    return(
        <nav className={`flex max-sm:w-48
        max-lg:border max-lg:border-r-2 max-sm:shadow-lg max-lg:shadow-black
        max-lg:flex-col max-lg:left-0 max-lg:top-0 max-lg:h-screen max-lg:z-10 max-lg:justify-between max-lg:w-60
        lg:flex-row lg:justify-between lg:items-center lg:top-0 lg:fixed z-10 lg:w-full lg:h-20 lg:py-5 lg:px-8 text-sm font-light bg-white
        ${context.responsiveDisplayNavbar ? 'max-lg:fixed' : 'max-lg:hidden'}`}>
            <ul className='max-sm:gap-5 max-sm:text-lg
            max-lg:text-xl max-lg:gap-6
            flex lg:flex-row max-lg:flex-col items-center gap-3'>
                <li className='max-lg:text-2xl max-lg:my-4
                font-semibold text-lg'>
                    <NavLink
                    to={context.signIn ? '/':'/sign-in'}
                    onClick={()=>handleResponsiveDisplay()}
                    >
                        Shopi
                    </NavLink>
                </li>
                <li>
                    <NavLink
                    to='/'
                    onClick={()=>context.setSearchByCategory()}
                    className={({isActive})=>
                        isActive ? activeStyle : undefined}>
                        All
                    </NavLink>
                </li>
                <li>
                    <NavLink
                    to='/clothes'
                    onClick={()=>context.setSearchByCategory('clothes')}
                    className={({isActive})=>
                        isActive ? activeStyle : undefined}>
                        Clothes
                    </NavLink>
                </li>
                <li>
                    <NavLink
                    to='/electronics'
                    onClick={()=>context.setSearchByCategory('electronics')}
                    className={({isActive})=>
                        isActive ? activeStyle : undefined}>
                        Electronics
                    </NavLink>
                </li>
                <li>
                    <NavLink
                    to='/furnitures'
                    onClick={()=>context.setSearchByCategory('furniture')}
                    className={({isActive})=>
                        isActive ? activeStyle : undefined}>
                        Furnitures
                    </NavLink>
                </li>
                <li>
                    <NavLink
                    to='/toys'
                    onClick={()=>context.setSearchByCategory('shoes')}
                    className={({isActive})=>
                        isActive ? activeStyle : undefined}>
                        Shoes
                    </NavLink>
                </li>
                <li>
                    <NavLink
                    to='/others'
                    onClick={()=>context.setSearchByCategory('miscellaneous')}
                    className={({isActive})=>
                        isActive ? activeStyle : undefined}>
                        Miscellaneous
                    </NavLink>
                </li>
            </ul>
            <ul className='max-sm:gap-5
            max-lg:gap-6 max-lg:text-lg
            flex lg:flex-row max-lg:flex-col items-center gap-3'>
                {context.signIn && 
                    <li className='text-black/60'>
                        {context.currentAccount[0].email}
                    </li>
                }
                {context.signIn && 
                    <li>
                        <NavLink
                        to='/my-orders'
                        className={({isActive})=>
                            isActive ? activeStyle : undefined}>
                            My Orders
                        </NavLink>
                    </li> 
                }
                {context.signIn && 
                    <li>
                        <NavLink
                        to='/my-account'
                        className={({isActive})=>
                            isActive ? activeStyle : undefined}>
                            My Account
                        </NavLink>
                    </li>
                }
                <li>{
                    context.signIn ? 
                        <button className='hover:underline underline-offset-4' onClick={()=>context.saveSignIn(false)}>
                            Sign out
                        </button>:
                        context.account?.length>0 ? 
                            <NavLink
                            to='/sign-in'
                            className={({isActive})=>
                                isActive ? activeStyle : undefined}>
                                Sign in
                            </NavLink> :
                            <NavLink
                            to='/sign-up'
                            className={({isActive})=>
                                isActive ? activeStyle : undefined}>
                                Sign Up
                            </NavLink>
                }</li>
                <li className='max-lg:my-4 flex items-center'>
                    <ShoppingCartIcon className='h-6 w-6'/>
                    <div>{context.cartProducts.length}</div>
                </li>
            </ul>
        </nav>
    )
}
export {Navbar}