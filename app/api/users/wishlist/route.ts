import { auth } from "@clerk/nextjs"
import { NextRequest, NextResponse } from "next/server";

import User from "@/lib/models/User";
import { connectToDB } from "@/lib/mongoDB";

export const POST = async (req: NextRequest) => {
    try {
        const { userId } = auth();
        console.log({userId});
        

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        await connectToDB()

        const user = await User.findOne({ clerkId: userId })

        if (!user) {
            return new NextResponse("User not found", { status: 404 })
        }

        const { productId } = await req.json()

        if (!productId) {
            return new NextResponse("Product Id required", { status: 400 })
        }

        const isLiked = user.wishlist.includes(productId)

        if (isLiked) {
            // Dislike
            user.wishlist = user.wishlist.filter((id: string) => id !== productId)
        } else {
            // Like
            user.wishlist.push(productId)
        }


        await user.save();

        return NextResponse.json(user, { status: 200 });

    } catch (error) {
        console.log(`[USER_POST]_${error}`);
        return new NextResponse(`Internal Error:${error}`, { status: 500 })
    }
}