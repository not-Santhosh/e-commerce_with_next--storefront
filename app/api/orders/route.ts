import Razorpay from 'razorpay';
import { NextRequest, NextResponse } from 'next/server';

console.log(process.env.NEXT_PUBLIC_razor_pay_key, process.env.NEXT_PUBLIC_razor_pay_key_secret);


const razorpay = new Razorpay({
 key_id: process.env.NEXT_PUBLIC_RAZOR_PAY_KEY!,
 key_secret: process.env.NEXT_PUBLIC_RAZOR_PAY_KEY_SECRET!,
});



export const POST = async(request: NextRequest) =>  {
    console.log(razorpay);
    try  {
        const { amount, currency } = (await request.json()) as {
            amount: string;
            currency: string;
        };
    
        var options = {
            amount: amount + 100,
            currency: currency,
            receipt: 'rcp1',
        };  
        const order = await razorpay.orders.create(options);
        return NextResponse.json({ orderId: order.id }, { status: 200 });
    } catch (error) {
        console.log(error);
        return new NextResponse('Internal Error', { status: 500 });
    }

}