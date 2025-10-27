import connectDB from "@/lib/mongodb";
import { connect } from "http2";
import { NextRequest, NextResponse } from "next/server";
import Event from "@/database/event.model";

export async function post(req:NextRequest) {
    try{
        await connectDB();
        const formData = await req.formData();
        let event;
        try{
            event =Object.fromEntries(formData.entries());
        }catch (e){
            return NextResponse.json({message:"invalid form data"},{status:400});
        }

    const createdEvent = await Event.create(event);
    return NextResponse.json({message:"event created successfully",event:createdEvent},{status:201});
    }

    
    catch (e){
        console.error(e);
        return NextResponse.json({message:"event creation",error: e instanceof Error ? e.message : "unknown error"},{status:500});
        
    }
}