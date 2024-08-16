import User from "@/lib/models/User";
import { connectToDB } from "@/lib/mongoDB";
import { useUser } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
    try {
        await connectToDB();

        const { userId, cartItem } = await request.json();

        if (!userId) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        let user = await User.findOne({userId: userId});
        user.cart = cartItem;
        await user.save();

        return NextResponse.json("Success", { status: 200 });

    } catch (error) {
        console.log(error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}