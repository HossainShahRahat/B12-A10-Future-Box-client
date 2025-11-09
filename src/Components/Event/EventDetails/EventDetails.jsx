import { useContext, useState } from "react";
import { useLoaderData, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../AuthProvider/AuthProvider.jsx";
import toast from "react-hot-toast";
import { FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa";

const EventDetails = () => {
  const event = useLoaderData();
  const { user, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [isJoining, setIsJoining] = useState(false);

  const {
    _id,
    title,
    description,
    eventType,
    thumbnail,
    location: eventLocation,
    eventDate,
    creatorEmail,
  } = event;

  const handleJoinEvent = () => {
    if (!user) {
      toast.error("You must be logged in to join an event.");
      navigate("/login", { state: { from: location } });
      return;
    }

    setIsJoining(true);

    const joinInfo = {
      eventId: _id,
      userEmail: user.email,
      eventTitle: title,
      eventDate: eventDate,
      location: eventLocation,
    };

    fetch("/api/joined-events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(joinInfo),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          toast.success("Successfully joined the event!");
        } else if (data.message) {
          toast.error(data.message);
        }
        setIsJoining(false);
      })
      .catch((err) => {
        console.error(err);
        toast.error("An error occurred. Please try again.");
        setIsJoining(false);
      });
  };

  return (
    <div className="container mx-auto px-4 my-12">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
        <div className="lg:col-span-3">
          <img
            src={thumbnail}
            alt={title}
            className="w-full h-auto max-h-[500px] object-cover rounded-lg shadow-lg"
          />
          <h1 className="text-4xl font-bold my-4">{title}</h1>

          <div className="flex flex-wrap gap-x-6 gap-y-2 text-gray-600 mb-4 items-center">
            <span className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-primary" />
              {eventLocation}
            </span>
            <span className="flex items-center gap-2">
              <FaCalendarAlt className="text-primary" />
              {new Date(eventDate).toLocaleString()}
            </span>
            <span className="badge badge-outline badge-primary font-medium">
              {eventType}
            </span>
          </div>

          <p className="text-lg text-base-content whitespace-pre-wrap">
            {description}
          </p>
        </div>

        <div className="lg:col-span-2">
          <div className="card bg-base-100 shadow-xl border lg:sticky lg:top-24">
            <div className="card-body items-center text-center">
              <h3 className="card-title text-2xl">Join This Event!</h3>
              <p className="my-2">
                Show your support and make a real impact in the community.
              </p>
              <div className="card-actions w-full mt-4">
                <button
                  onClick={handleJoinEvent}
                  className="btn btn-primary w-full btn-lg"
                  disabled={
                    isJoining || loading || user?.email === creatorEmail
                  }
                >
                  {isJoining && (
                    <span className="loading loading-spinner"></span>
                  )}
                  {user?.email === creatorEmail
                    ? "This is Your Event"
                    : "Join Event"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
