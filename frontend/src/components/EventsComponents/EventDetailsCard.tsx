// @ts-nocheck

import {
  Calendar,
  MapPin,
  Users,
  Heart,
  Share2,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import EventDialog from "./Refferal";

function EventDetailsCard() {
  const navigate = useNavigate();
  const [eventInfo, setEventInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleVolunteer = () => {
    navigate(`/volunteer/${id}`);
  };

  useEffect(() => {
    const getEventById = async () => {
      try {
        const res = await axios.get(`https://causeconnect-dgu1.onrender.com/api/events/${id}`, {
          withCredentials: true,
        });
        setEventInfo(res.data.data);
      } catch (error) {
        setError("Failed to load event details");
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getEventById();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-red-500 text-xl">{error}</p>
      </div>
    );
  }

  return (
    <Card className="max-w-2xl p-6 mb-8 bg-white/95 backdrop-blur-sm shadow-xl rounded-xl space-y-6 transition-all duration-300 hover:shadow-2xl">
      <div className="relative group">
        <img
          src={
            eventInfo?.image
              ? `https://causeconnect-dgu1.onrender.com/uploads/${eventInfo.image.split('/').pop()}`
              : "https://img.freepik.com/premium-photo/world-charity-day-backgrounds_1198941-10278.jpg?w=740"
          }
          alt="Event"
          className="w-full h-56 object-cover rounded-xl shadow-md transition-transform duration-300 group-hover:scale-[1.02]"
        />
        <div className="absolute top-4 right-4 flex gap-2">
          <Button
            size="icon"
            variant="secondary"
            className="rounded-full bg-white/80 hover:bg-white"
          >
            <Heart className="w-4 h-4 text-blue-900" />
          </Button>
          <Button
            size="icon"
            variant="secondary"
            className="rounded-full bg-white/80 hover:bg-white"
          >
            <Share2 className="w-4 h-4 text-blue-900" />
          </Button>
        </div>
      </div>

      {/* Title Section */}
      <div className="space-y-2">
        <div className="inline-block px-3 py-1 rounded-full text-sm font-semibold text-white bg-blue-900">
          {eventInfo?.status || "Upcoming"}
        </div>
        <h1 className="text-2xl font-bold text-blue-900">{eventInfo.title}</h1>
        <p className="text-sm text-blue-900/70 font-medium">
          Organized by {eventInfo?.organizer?.username || "Unknown"}
        </p>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-3 gap-3">
        <div className="p-3 bg-yellow-100/50 rounded-lg">
          <Calendar className="w-5 h-5 text-blue-900 mb-1" />
          <p className="text-sm font-semibold text-blue-900">
            {eventInfo?.date ? formatDate(eventInfo.date) : "TBA"}
          </p>
        </div>
        <div className="p-3 bg-yellow-100/50 rounded-lg">
          <MapPin className="w-5 h-5 text-blue-900 mb-1" />
          <p className="text-sm font-semibold text-blue-900">
            {eventInfo?.location || "Location not available"}
          </p>
        </div>
        <div className="p-3 bg-yellow-100/50 rounded-lg">
          <Users className="w-5 h-5 text-blue-900 mb-1" />
          <p className="text-sm font-semibold text-blue-900">
            {eventInfo?.registeredVolunteers?.length || 0}/200 Volunteers
          </p>
        </div>
      </div>

      {/* Description Sections */}
      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-bold text-blue-900 mb-2">
            Event Description
          </h2>
          <p className="text-sm text-blue-900/70 leading-relaxed">
            {eventInfo?.description || "No description available."}
          </p>
        </div>

        <div>
          <h2 className="text-lg font-bold text-blue-900 mb-2">Impact</h2>
          <p className="text-sm text-blue-900/70 leading-relaxed">
            {eventInfo?.impact || "No impact information available."}
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 pt-2">
        <Button
          onClick={handleVolunteer}
          className="flex-1 h-10 rounded-full bg-blue-900 hover:bg-blue-800 text-base font-semibold text-yellow-400 transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          Volunteer Now
          <ArrowRight className="ml-2 w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          className="flex-1 h-10 rounded-full border-2 border-blue-900 text-base font-semibold text-blue-900 hover:bg-blue-900 hover:text-yellow-400 transition-all duration-300"
        >
          Contact Organizer
        </Button>
        <EventDialog id = {id}/>
      </div>
      
    </Card>
  );
};

export default EventDetailsCard;
