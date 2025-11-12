import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { motion } from "framer-motion";

const UpcomingEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [eventType, setEventType] = useState("");

  const eventTypesList = [
    "Cleanup",
    "Plantation",
    "Donation",
    "Food Drive",
    "Workshop",
  ];

  const fetchEvents = () => {
    setLoading(true);

    const params = new URLSearchParams();
    if (searchTerm) {
      params.append("search", searchTerm);
    }
    if (eventType) {
      params.append("type", eventType);
    }

    fetch(
      `${import.meta.env.VITE_API_URL}/api/events/upcoming?${params.toString()}`
    )
      .then((res) => res.json())
      .then((data) => {
        setEvents(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchEvents();
  };

  return (
    <motion.div
      className="container mx-auto px-4 my-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold">Upcoming Community Events</h1>
        <p className="text-lg mt-2 text-gray-600">
          Find an event and get involved!
        </p>
      </div>

      <form
        onSubmit={handleSearchSubmit}
        className="flex flex-col md:flex-row gap-3 mb-8 p-4 bg-base-200 rounded-lg shadow-md"
      >
        <input
          type="text"
          placeholder="Search by event name..."
          className="input input-bordered w-full md:flex-grow"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="select select-bordered w-full md:w-auto"
          value={eventType}
          onChange={(e) => setEventType(e.target.value)}
        >
          <option value="">All Event Types</option>
          {eventTypesList.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
        <button type="submit" className="btn btn-primary">
          <FaSearch />
          Search
        </button>
      </form>

      {loading ? (
        <div className="text-center py-10">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
      ) : events.length === 0 ? (
        <div className="text-center py-10">
          <h3 className="text-2xl font-semibold text-gray-500">
            No Events Found
          </h3>
          <p className="text-gray-400">Try adjusting your search or filter.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <div
              key={event._id}
              className="card bg-base-100 shadow-xl border flex flex-col"
            >
              <figure className="h-52 overflow-hidden">
                <img
                  src={event.thumbnail}
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
              </figure>
              <div className="card-body flex-grow">
                <h2 className="card-title">{event.title}</h2>
                <p className="text-gray-600 flex-grow">{event.location}</p>
                <div className="flex justify-between items-center my-2">
                  <span className="badge badge-outline badge-primary">
                    {event.eventType}
                  </span>
                  <span className="font-semibold text-gray-700">
                    {new Date(event.eventDate).toLocaleDateString()}
                  </span>
                </div>
              </div>
              <div className="card-actions p-4 pt-0">
                <Link
                  to={`/event/${event._id}`}
                  className="btn btn-primary w-full"
                >
                  View Event
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default UpcomingEvents;
