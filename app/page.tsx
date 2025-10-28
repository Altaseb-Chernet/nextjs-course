import EventCard from "@/components/EventCard"
import ExploreBtn from "@/components/ExploreBtn"
import { IEvent } from "@/database";

import { title } from "process"


  
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const page = async () => {
  const response = await fetch(`${BASE_URL}/api/events`);
  const {events} = await response.json();
  
  return (
    <section>
      <h1 className="text-center">The Hub for every tech</h1>
      <p className="text-center mt-5">hackathons meetups, and conferences, All in  one place</p>
      <ExploreBtn/>
      <div className="mt-20 space-y-7">
        <h3>Featured Events</h3>
        <ul className="events">
            {events && events.length>0 && events.map((event:IEvent)=>(
              <li key={event.title}>
                <EventCard {...event}/>
              </li>
            ))}
        </ul>

      </div>
    </section>
  )
}

export default page
