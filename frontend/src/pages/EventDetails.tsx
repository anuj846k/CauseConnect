import EventDetailsCard from "@/components/EventsComponents/EventDetailsCard";
import Map from "@/components/map/Map";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Users, Calendar, MessageCircle, Bell } from "lucide-react";
import VolunteerList from "@/components/VolunteerComponents/VolunteerList";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const EventDetails = () => {
  const { id } = useParams();
  const [eventStats, setEventStats] = useState({
    registered: 0,
    maxVolunteers: 0,
    daysLeft: 0,
    interestLevel: "Low",
  });

  useEffect(() => {
    const fetchEventStats = async () => {
      try {
        const response = await axios.get(
          `https://causeconnect-dgu1.onrender.com/api/events/${id}`,
          {
            withCredentials: true,
          }
        );
        const event = response.data.data;

        // Calculate days left
        const eventDate = new Date(event.date);
        const today = new Date();
        const daysLeft = Math.ceil((eventDate - today) / (1000 * 60 * 60 * 24));

        // Calculate interest level
        const interestLevel = calculateInterestLevel(
          event.registeredVolunteers?.length || 0
        );

        setEventStats({
          registered: event.registeredVolunteers?.length || 0,
          maxVolunteers: event.maxVolunteers || 50,
          daysLeft: daysLeft,
          interestLevel,
        });
      } catch (error) {
        console.error("Error fetching event stats:", error);
      }
    };

    if (id) {
      fetchEventStats();
    }
  }, [id]);

  const calculateInterestLevel = (registeredCount) => {
    if (registeredCount >= 40) return "High";
    if (registeredCount >= 20) return "Medium";
    return "Low";
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-2/3">
          <EventDetailsCard />

          <Tabs defaultValue="requirements" className="mt-8">
            <TabsList className="bg-blue-50 p-1 rounded-lg">
              <TabsTrigger
                value="requirements"
                className="flex items-center gap-2"
              >
                <Users className="w-4 h-4" />
                Requirements
              </TabsTrigger>
              <TabsTrigger
                value="volunteers"
                className="flex items-center gap-2"
              >
                <Users className="w-4 h-4" />
                Volunteers
              </TabsTrigger>
              <TabsTrigger value="schedule" className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Schedule
              </TabsTrigger>
              <TabsTrigger value="updates" className="flex items-center gap-2">
                <Bell className="w-4 h-4" />
                Updates
              </TabsTrigger>
              <TabsTrigger
                value="discussion"
                className="flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                Discussion
              </TabsTrigger>
            </TabsList>

            <TabsContent value="requirements">
              <Card className="p-6">
                <h3 className="text-xl font-semibold text-blue-900 mb-4">
                  Volunteer Requirements
                </h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-center gap-2">
                    • Must be 18 years or older
                  </li>
                  <li className="flex items-center gap-2">
                    • Available for full duration of event
                  </li>
                  <li className="flex items-center gap-2">
                    • Basic first aid knowledge (preferred)
                  </li>
                </ul>
              </Card>
            </TabsContent>

            <TabsContent value="volunteers">
              <Card className="p-6">
                <h3 className="text-xl font-semibold text-blue-900 mb-4">
                  Event Volunteers
                </h3>
                <VolunteerList eventId={id} />
              </Card>
            </TabsContent>

            <TabsContent value="schedule">
              <Card className="p-6">
                <h3 className="text-xl font-semibold text-blue-900 mb-4">
                  Event Schedule
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="font-semibold w-24">9:00 AM</div>
                    <div>Registration & Check-in</div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="font-semibold w-24">9:30 AM</div>
                    <div>Orientation & Briefing</div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="font-semibold w-24">10:00 AM</div>
                    <div>Event Activities Begin</div>
                  </div>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="updates">
              <Card className="p-6">
                <h3 className="text-xl font-semibold text-blue-900 mb-4">
                  Recent Updates
                </h3>
                <div className="space-y-4">
                  <div className="border-l-4 border-blue-900 pl-4 py-2">
                    <p className="text-sm text-gray-500">2 days ago</p>
                    <p className="text-gray-700">
                      Updated meeting point location
                    </p>
                  </div>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="discussion">
              <Card className="p-6">
                <h3 className="text-xl font-semibold text-blue-900 mb-4">
                  Discussion
                </h3>
                <textarea
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-900 mb-4"
                  placeholder="Ask a question or leave a comment..."
                  rows={3}
                />
                <button className="px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800">
                  Post Comment
                </button>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Right Column - Map and Additional Info */}
        <div className="lg:w-1/3 space-y-3">
          {/* Map Container */}
          <div className="map-container rounded-lg overflow-hidden shadow-lg border border-gray-200">
            <Map height="300px" width="100%" />
          </div>

          {/* Event Stats */}
          <Card className="p-6">
            <h3 className="text-xl font-semibold text-blue-900 mb-4">
              Event Stats
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Registered</span>
                <span className="font-semibold">
                  {eventStats.registered}/{eventStats.maxVolunteers}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Days Left</span>
                <span className="font-semibold">{eventStats.daysLeft}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Interest Level</span>
                <span
                  className={`font-semibold ${
                    eventStats.interestLevel === "High"
                      ? "text-green-600"
                      : eventStats.interestLevel === "Medium"
                      ? "text-yellow-600"
                      : "text-red-600"
                  }`}
                >
                  {eventStats.interestLevel}
                </span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
