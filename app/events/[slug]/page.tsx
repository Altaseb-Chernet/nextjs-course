import {Suspense} from "react";
import{notFound} from "next/navigation";


const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const EventDetailsPage = async ({ params }: { params: Promise<{ slug: string }>}) => {
  const {slug} = await params;
  const request = await fetch(`${BASE_URL}/api/events/${slug}`);
  const {event:{description,image,overview,time,location,mode,agenda,audience}} = await request.json();

  if (!description) {
    return <div>Event not found</div>;
  }
 

    return (
        <section id="event">
            <div className="header">
             <h1>Event Description</h1>
             <p className="mt-2">{description}</p>
            </div>
        </section>
    )
}
export default EventDetailsPage