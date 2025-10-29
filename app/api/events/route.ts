import connectDB from "@/lib/mongodb";
import { v2 as cloudinary } from "cloudinary";
import { connect } from "http2";
import { NextRequest, NextResponse } from "next/server";
import Event from "@/database/event.model";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const formData = await req.formData();

    let event;
    try {
      event = Object.fromEntries(formData.entries());
    } catch (e) {
      return NextResponse.json(
        { message: "invalid form data" },
        { status: 400 }
      );
    }

    const file = formData.get("image") as File;
    if (!file) {
      return NextResponse.json(
        { message: "image file is required" },
        { status: 400 }
      );
    }

    const tags = formData.get("tags") as string;
    const agenda = formData.get("agenda") as string;

    
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          { resource_type: "image", folder: "TechEvent" },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          }
        )
        .end(buffer);
    });
    event.image = (uploadResult as { secure_url: string }).secure_url;
    const createdEvent = await Event.create(event);
    return NextResponse.json(
      { message: "event created successfully", event: createdEvent },
      { status: 201 }
    );
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      {
        message: "event creation",
        error: e instanceof Error ? e.message : "unknown error",
      },
      { status: 500 }
    );
  }
}

export async function GET(){
    try{
        await connectDB();
        const events = await Event.find().sort({ createdAt: -1 });
        return NextResponse.json({message: "Event featched successfully",events }, {status:200});

    }catch (e){
        return NextResponse.json({message: "fetching events failed",error: e},{ status: 500 }
          );
    }

}