import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const VolunteerList = ({ eventId }) => {
  const [volunteers, setVolunteers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVolunteers = async () => {
      try {
        const response = await axios.get(
          `https://causeconnect-dgu1.onrender.com//api/events/${eventId}/volunteer`,
          { withCredentials: true }
        );
        setVolunteers(response.data.data);
      } catch (error) {
        setError("Failed to load volunteers");
        console.error("Error fetching volunteers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVolunteers();
  }, [eventId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-48">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 py-4">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-blue-900">
          Total Volunteers: {volunteers.length}
        </h3>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Availability</TableHead>
            <TableHead>Applied On</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {volunteers.map((volunteer) => (
            <TableRow key={volunteer._id}>
              <TableCell className="font-medium">{volunteer.name}</TableCell>
              <TableCell>{volunteer.email}</TableCell>
              <TableCell>{volunteer.availability}</TableCell>
              <TableCell>
                {new Date(volunteer.appliedAt).toLocaleDateString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {volunteers.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No volunteers have signed up yet.
        </div>
      )}
    </div>
  );
};

export default VolunteerList;
