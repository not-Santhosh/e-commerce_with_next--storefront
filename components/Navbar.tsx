"use client";

import { UserButton, useUser } from '@clerk/nextjs'
import { CircleUserRound, Menu, ShoppingCart } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react';

const Navbar = () => {

    const [dropDown, setDropDown] = useState(false);
    const {user} = useUser();

    return (
        <div className='flex top-0 sticky z-10 py-2 px-10 justify-between items-center bg-white'>
            <Link href={'/'}>
                <Image src={'/logo.png'} alt="logo" width={130} height={100} />
            </Link>
            <div className='relative flex gap-3 items-center'>
                <Link href={'/cart'} className='flex items-center gap-3 border rounded-lg px-2 py-1 hover:bg-black hover:text-white'>
                    <ShoppingCart />
                    <p className='text-base-bold'>Cart (0)</p>
                </Link>

                {user && <Menu className='cursor-pointer' onClick={() => setDropDown(!dropDown)}/>}
                {user && dropDown && (
                    <div className='absolute flex flex-col border top-10 right-5 gap-2 p-3 rounded-lg text-base-bold bg-white'>
                        <Link href={'/wishlist'} className='hover:text-red-1'>Wishlist</Link>
                        <Link href={'/orders'} className='hover:text-red-1'>Orders</Link>
                    </div>
                )}
                {user ? (<UserButton afterSignOutUrl='/sign-in'/>) : <Link href={'/sign-in'}><CircleUserRound /></Link>}
            </div>
        </div>
    )
}

export default Navbar
