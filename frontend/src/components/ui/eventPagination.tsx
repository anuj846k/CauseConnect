import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface Event {
  _id: string;
  title: string;
  description: string;
}

const PaginatedEvents: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const getAllEvents = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`https://causeconnect-dgu1.onrender.com//api/events?page=${page}&limit=5`, {
          withCredentials: true,
        });
        setEvents(res.data.events); // Use `res.data.events` to access the events array
        setTotalPages(res.data.totalPages); // Total pages based on backend pagination
      } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 401) {
          navigate("/login");
        } else {
          console.error("Failed to fetch events. Please try again later.");
        }
      } finally {
        setLoading(false);
      }
    };
    getAllEvents();
  }, [page, navigate]);

  const handleNextPage = () => {
    if (page < totalPages) setPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    if (page > 1) setPage((prevPage) => prevPage - 1);
  };

  return (
    <div className="event-stack">
      <h2 className="text-xl font-semibold mb-4">Upcoming Events</h2>
      {loading ? (
        <p className="text-blue-500">Loading events...</p>
      ) : (
        <div className="stack-container space-y-4">
          {events.map((event) => (
            <div key={event._id} className="event-card p-4 bg-white shadow-lg rounded-lg">
              <h3 className="text-lg font-bold">{event.title}</h3>
              <p className="text-sm text-gray-700">{event.description}</p>
            </div>
          ))}
        </div>
      )}
      <div className="pagination-controls flex justify-between mt-6 items-center">
        <button 
          onClick={handlePreviousPage} 
          disabled={page === 1} 
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-gray-700">
          Page {page} of {totalPages}
        </span>
        <button 
          onClick={handleNextPage} 
          disabled={page === totalPages} 
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PaginatedEvents;
