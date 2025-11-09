import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider.jsx";
import toast from "react-hot-toast";
import { FaEdit, FaTrash } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const ManageEvents = () => {
  const { user } = useContext(AuthContext);
  const [myEvents, setMyEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedEvent, setSelectedEvent] = useState(null);
  const [startDate, setStartDate] = useState(new Date());

  const eventTypesList = [
    "Cleanup",
    "Plantation",
    "Donation",
    "Food Drive",
    "Workshop",
    "Other",
  ];

  const fetchMyEvents = () => {
    setLoading(true);
    if (user?.email) {
      fetch(`/api/my-events?email=${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          setMyEvents(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
          toast.error("Could not fetch events.");
        });
    }
  };

  useEffect(() => {
    fetchMyEvents();
  }, [user]);

  const openUpdateModal = (event) => {
    setSelectedEvent(event);
    setStartDate(new Date(event.eventDate));
    document.getElementById("update_modal").showModal();
  };

  const handleUpdateEvent = (event) => {
    event.preventDefault();
    const form = event.target;

    const updatedEvent = {
      title: form.title.value,
      description: form.description.value,
      eventType: form.eventType.value,
      thumbnail: form.thumbnail.value,
      location: form.location.value,
      eventDate: startDate,
    };

    fetch(`/api/event/${selectedEvent._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedEvent),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          toast.success("Event Updated Successfully!");
          fetchMyEvents();
          document.getElementById("update_modal").close();
        } else {
          toast.error("No changes were made.");
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to update event.");
      });
  };

  const handleDeleteEvent = (id) => {
    if (!window.confirm("Are you sure you want to delete this event?")) {
      return;
    }

    fetch(`/api/event/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount > 0) {
          toast.success("Event Deleted Successfully!");
          fetchMyEvents();
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to delete event.");
      });
  };

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
        Manage Your Events
      </h1>

      {myEvents.length === 0 ? (
        <div className="text-center py-10">
          <h3 className="text-2xl font-semibold text-gray-500">
            You haven't created any events yet.
          </h3>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Event Title</th>
                <th>Date</th>
                <th>Location</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {myEvents.map((event) => (
                <tr key={event._id} className="hover">
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img src={event.thumbnail} alt={event.title} />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{event.title}</div>
                        <div className="text-sm opacity-50">
                          {event.eventType}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>{new Date(event.eventDate).toLocaleDateString()}</td>
                  <td>{event.location}</td>
                  <th className="flex gap-2">
                    <button
                      onClick={() => openUpdateModal(event)}
                      className="btn btn-primary btn-sm btn-outline"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDeleteEvent(event._id)}
                      className="btn btn-error btn-sm btn-outline"
                    >
                      <FaTrash />
                    </button>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <dialog id="update_modal" className="modal">
        <div className="modal-box w-11/12 max-w-3xl">
          <h3 className="font-bold text-2xl mb-4">Update Event</h3>

          {selectedEvent && (
            <form onSubmit={handleUpdateEvent} className="space-y-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Event Title</span>
                </label>
                <input
                  type="text"
                  name="title"
                  defaultValue={selectedEvent.title}
                  className="input input-bordered w-full"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Event Type</span>
                  </label>
                  <select
                    name="eventType"
                    defaultValue={selectedEvent.eventType}
                    className="select select-bordered w-full"
                  >
                    {eventTypesList.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Event Date</span>
                  </label>
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    minDate={new Date()}
                    showTimeSelect
                    dateFormat="MMMM d, yyyy h:mm aa"
                    className="input input-bordered w-full"
                    wrapperClassName="w-full"
                  />
                </div>
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Location</span>
                </label>
                <input
                  type="text"
                  name="location"
                  defaultValue={selectedEvent.location}
                  className="input input-bordered w-full"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Thumbnail URL</span>
                </label>
                <input
                  type="text"
                  name="thumbnail"
                  defaultValue={selectedEvent.thumbnail}
                  className="input input-bordered w-full"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Description</span>
                </label>
                <textarea
                  name="description"
                  defaultValue={selectedEvent.description}
                  className="textarea textarea-bordered h-32"
                ></textarea>
              </div>
              <div className="modal-action mt-6">
                <button type="submit" className="btn btn-primary">
                  Save Changes
                </button>
                <form method="dialog">
                  <button className="btn btn-ghost">Cancel</button>
                </form>
              </div>
            </form>
          )}
        </div>
      </dialog>
    </div>
  );
};

export default ManageEvents;
