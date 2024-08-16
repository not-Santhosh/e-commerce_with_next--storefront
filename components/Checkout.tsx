"use client";

import { count } from 'console';
import { Loader } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Script from 'next/script';
import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

declare global {
    interface Window {
        Razorpay: any;
    }
}

const Checkout = () => {
    
    const router = useRouter();
    const [country, setCountry] = useState<any[]>();
    const [city, setCity] = useState();
    const [state, setState] = useState();

    useEffect(() => {
        fetch('/api/csc', {
            method: "GET"
        })
        .then((res) => res.json())
        .then((data) => {
            setCountry(data.data); // Access the data from the object
        })
        .catch((error) => {
            console.error("Error fetching countries:", error);
        });
    }, []);
    
    
    // const createOrderId = async () => {
    //     try {
    //         const response = await fetch('/api/orders', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify({
    //                 amount: amount * 100,
    //                 currency: process.env.NEXT_PUBLIC_CURRENCY,
    //             })
    //         });

    //         if (!response.ok) {
    //             throw new Error('Network response was not ok');
    //             setLoading(false);
    //         }

    //         const data = await response.json();
    //         return data.orderId;
    //     } catch (error) {
    //         console.error('There was a problem with your fetch operation:', error);
    //     }
    // };

    // const processPayment = async (e: React.FormEvent<HTMLFormElement>) => {
    //     e.preventDefault();
    //     setLoading(true);
    //     try {
    //         const orderId: string = await createOrderId();
    //         const options = {
    //             key: process.env.NEXT_PUBLIC_RAZOR_PAY_KEY,
    //             amount: amount * 100,
    //             currency: process.env.NEXT_PUBLIC_CURRENCY,
    //             name: process.env.NEXT_PUBLIC_BUSSINESS_NAME,
    //             description: 'Test Transaction',
    //             order_id: orderId,
    //             handler: async function (response: any) {
    //                 const data = {
    //                     orderCreationId: orderId,
    //                     razorpayPaymentId: response.razorpay_payment_id,
    //                     razorpayOrderId: response.razorpay_order_id,
    //                     razorpaySignature: response.razorpay_signature,
    //                 };

    //                 const result = await fetch('/api/callback', {
    //                     method: 'POST',
    //                     body: JSON.stringify(data),
    //                     headers: { 'Content-Type': 'application/json' },
    //                 });

    //                 const res = await result.json();
    //                 if (res.isOk) {
    //                     setLoading(false);
    //                     router.push('/success');
    //                 }
    //                 else {
    //                     setLoading(false);
    //                     toast.error("Payment Failed");
    //                 }
    //             },
    //             theme: {
    //                 color: '#3399cc',
    //             },
    //         };
    //         const paymentObject = new window.Razorpay(options);

    //         paymentObject.on('payment.failed', function (response: any) {
    //             toast.error("Payment Failed.")
    //         });

    //         paymentObject.open();
    //     } catch (error) {
    //         console.log(error);
    //         setLoading(false);
    //     }
    // };

    return (
        <div>
            <Script
                id="razorpay-checkout-js"
                src="https://checkout.razorpay.com/v1/checkout.js"
            />
            <div className='border-gray-200 border-y-2'>
                <div className='rounded border p-6 bg-white shadow-sm'>
                    <h2 className='font-extrabold text-2xl text-gray-600 mb-6'>Shipment Information</h2>
                    <div>
                        <div className='mb-4'>
                            <input id="name" placeholder="Enter Your Name" className='w-full p-2 border-2 border-gray-300 rounded-lg focus:outline-none' />
                        </div>
                        <div className='mb-4'>
                            <input id="email" placeholder="Enter Your Email" className='w-full p-2 border-2 border-gray-300 rounded-lg focus:outline-none' />
                        </div>
                        <div className='mb-4'>
                            <input id="phone" placeholder="Enter Your Phone" className='w-full p-2 border-2 border-gray-300 rounded-lg focus:outline-none' />
                        </div>
                    </div>
                    <div className='my-6'>
                        <h2 className="font-extrabold text-2xl text-gray-600 mb-6">Shipping Address</h2>
                        <div className='grid grid-cols-1 gap-3 mb-4'>
                            <input id="address" name='address_line_1' placeholder="Address line 1" className='w-full p-2 border-2 rounded-lg border-gray-300 focus:outline-none' />
                            <input id="address" name='address_line_2' placeholder="Address line 2" className='w-full p-2 border-2 border-gray-300 focus:outline-none' />
                        </div>
                        <div className="grid grid-cols-2 gap-2 my-3">
                            <select name='country' id="country" className='p-2 focus:outline-none border-gray-300  rounded-lg border-2' required >
                                <option value="">Select Country</option>
                                {country?.map((country, index) => (
                                    <option key={index} value={country.id}>{country.name}</option>
                                ))}
                                <option value="India">India</option>
                            </select>
                            <select name='state' id="country" className='p-2 focus:outline-none border-gray-300 rounded-lg  border-2' required >
                                <option value="" className='text-gray-50'>Select your State</option>
                                <option value="India">India</option>
                            </select>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            <select name='state' id="country" className='p-2 focus:outline-none border-gray-300 rounded-lg border-2' required >
                                <option value="" className='text-gray-300'>Select your City</option>
                                <option value="India">India</option>
                            </select>
                            <input type="text" name="pincode" className='p-2 border-2 border-gray-300 rounded-lg focus:outline-none' />
                        </div>
                    </div>
                    <button type='submit' className='w-full py-3 bg-blue-600 text-white font-bold rounded-lg mt-4'>
                        {0 ? (<div className='flex justify-center'><Loader className='animate-spin' /></div>) : 'Pay Now'}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Checkout
