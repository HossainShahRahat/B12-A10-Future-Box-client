import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider.jsx";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const JoinedEvents = () => {
  const { user } = useContext(AuthContext);
  const [joinedEvents, setJoinedEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJoinedEvents = async () => {
      setLoading(true);
      if (user?.email) {
        try {
          const token = await user.getIdToken();
          const res = await fetch(`/api/joined-events?email=${user.email}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (!res.ok) {
            throw new Error("Failed to fetch joined events.");
          }

          const data = await res.json();

          const sortedData = data.sort(
            (a, b) => new Date(a.eventDate) - new Date(b.eventDate)
          );

          setJoinedEvents(sortedData);
        } catch (err) {
          console.error(err);
          toast.error("Could not fetch your joined events.");
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchJoinedEvents();
  }, [user]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 my-12">
      <h1 className="text-4xl font-bold text-center mb-10">
        Events You've Joined
      </h1>

      {joinedEvents.length === 0 ? (
        <div className="text-center py-10">
          <h3 className="text-2xl font-semibold text-gray-500">
            You haven't joined any events yet.
          </h3>
          <Link to="/upcoming-events" className="btn btn-primary mt-4">
            Find Events to Join
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {joinedEvents.map((event) => (
            <div key={event._id} className="card bg-base-100 shadow-xl border">
              <div className="card-body">
                <h2 className="card-title">{event.eventTitle}</h2>
                <p className="text-gray-600">{event.location}</p>

                <div className="flex justify-between items-center my-2">
                  <span className="font-semibold text-gray-700">
                    {new Date(event.eventDate).toLocaleDateString()}
                  </span>
                </div>
                <div className="card-actions mt-2">
                  <Link
                    to={`/event/${event.eventId}`}
                    className="btn btn-outline btn-primary w-full"
                  >
                    View Original Event
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default JoinedEvents;
