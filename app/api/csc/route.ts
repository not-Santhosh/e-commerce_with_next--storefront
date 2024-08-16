import CSC from "@/lib/models/Country";
import { connectToDB } from "@/lib/mongoDB";
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server";

export const GET = async() => {
    
    try {
        // const { user } = auth();
    
        // if (!user) {
        //     return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        // }
        await connectToDB();
        const country = await CSC.find({id: 1}).sort({name: "asc"});
        return NextResponse.json({ data: country }, { status: 200 });
    } catch (error) {
        console.error("Error fetching country data:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
