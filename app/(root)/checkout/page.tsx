"use client";

import { useEffect, useState } from 'react'

import Checkout from '@/components/Checkout'
import useUser from '@/lib/hooks/useUser';
import Loader from '@/components/custom-ui/Loader';

const page = () => {

  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState(0);
  const userInstance = useUser();

  useEffect(() => {
    setLoading(true);
    setAmount(userInstance.user?.cartItems.reduce((acc, item) => acc + item.item.price * item.quantity, 0) || 0);
    setLoading(false);
  }, []);

  return (
    <div className='md:flex md:gap-6 p-6'>
      <div className="md:w-1/2 box-border border-4 border-gray-300 bg-[#f5f5f5] p-6 rounded-lg">
        <h2 className='text-2xl font-bold mb-4'>Pay</h2>
        <p className='text-3xl font-bold text-gray-700 mb-6'><span>Rs.</span>&nbsp;{amount}</p>
        {userInstance.user?.cartItems.map((item, index) => 
          (<div key={index} className="flex justify-between align-middle my-2">
            <span className='font-bold'>Amount</span>
            <span><span>Rs.</span>&nbsp;{amount}</span>
          </div>))
        }
      </div>
      <div className="md:w-1/2">
        <Checkout />
      </div>
    </div>
  );
}

export default page
