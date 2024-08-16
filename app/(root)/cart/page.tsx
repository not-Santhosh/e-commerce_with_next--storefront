"use client";

import { MinusCircle, PlusCircle, Trash } from 'lucide-react';
import Image from 'next/image';
import React, { useState } from 'react'

import useCart from '@/lib/hooks/useCart'
import Checkout from '@/components/Checkout';
import Loader from '@/components/custom-ui/Loader'
import { useRouter } from 'next/navigation';

const CartPage = () => {

  const [loading, setLoading] = useState(false);
  const cart = useCart();
  const Total = cart.cartItem.reduce((acc, item) => acc + item.item.price * item.quantity , 0);
  const Roundedtotal = parseFloat(Total.toFixed(2));

  const router = useRouter();

  return (
    <>
      {loading && (
        <div className="flex justify-center items-center fixed inset-0 bg-black bg-opacity-50 z-50">
          <Loader />
        </div>
      )}
      <div className='flex gap-16 py-16 px-10 max-lg:flex-col bg'>
        <div className="w-2/3 max-lg:w-full">
          <p className="text-heading2-bold">Shopping Cart</p>
          <hr className='my-6'/>   

          {cart.cartItem.length === 0 ? (
            <p className='text-body-bold'>Your Cart is Empty</p>
          ) : (
            <div className=''>
              {cart.cartItem.map((item) => (
                <div key={item.item._id} 
                  className='flex w-full max-sm:flex-col max-sm:gap-3
                  rounded-lg border-red-3 px-6 py-5 items-center justify-between 
                  max-sm:items-start border-gray-300 border-2 mb-3'>
                  <div className="flex items-center">
                    <Image src={item.item.media[0]} 
                      alt='image' width={100} height={100}
                      className='rounded-lg w-32 h-32 object-cover'
                    />
                    <div className="flex flex-col gap-3 ml-4">
                      <p className="text-body-bold">{item.item.title}</p> 
                      {item.color && (
                        <p className="text-small-medium">{item.color}</p>
                      )}
                      {item.size && (
                        <p className="text-small-medium">{item.size}</p>
                      )}
                      <p className="text-body-bold">{item.item.price}</p>
                    </div>
                  </div>
                  <div className="flex gap-4 items-center">
                    <MinusCircle className="hover:text-red-1 cursor-pointer" onClick={() => cart.decreaseQuantity(item.item._id)} />
                    <span className="text-body-bold">{item.quantity}</span>
                    <PlusCircle className="hover:text-red-1 cursor-pointer" onClick={() => cart.increaseQuantity(item.item._id)} />
                  </div>
                  <Trash className='hover:text-red-1 cursor-pointer' onClick={() => cart.removeItem(item.item._id)}/>
                </div>
              ))}
            </div>
          )}   
        </div>

        <div className="w-1/3 max-lg:w-full flex flex-col gap-8 bg-grey-1 rounded-lg py-5 px-4 h-full">
          <p className="text-heading-bold">
            Summary <span>{(`${cart.cartItem.length} ${cart.cartItem.length > 1 ? "items" : "item"}`)}</span>
          </p>
          <div className="flex justify-between text-semi-bold">
            <span>Total Amount</span>
            <span>$ {Roundedtotal}</span>
          </div>
          <div>
            <button onClick={() => {router.push('/checkout');setLoading(true);}} className='w-full py-3 bg-blue-600 text-white font-bold rounded-lg mt-4 hover:bg-blue-800'>
              Proceed To Checkout
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default CartPage
