// @ts-nocheck
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import VolunteerForm from "../components/VolunteerComponents/volunterForm";

const VolunteerPage = () => {
  const { id } = useParams();
  const [eventDetails, setEventDetails] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(true);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await axios.get(
          `https://causeconnect-dgu1.onrender.com/api/events/${id}`,
          { withCredentials: true }
        );
        setEventDetails(response.data.data);
      } catch (error) {
        console.error("Error fetching event details:", error);
      }
    };

    if (id) {
      fetchEventDetails();
    }
  }, [id]);

  return (
    <div className="container mx-auto px-4 py-8">
      <VolunteerForm
        eventId={id}
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        eventTitle={eventDetails?.title}
      />
    </div>
  );
};

export default VolunteerPage;
