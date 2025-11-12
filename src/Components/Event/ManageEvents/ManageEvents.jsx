import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider.jsx";
import toast from "react-hot-toast";
import { FaEdit, FaTrash } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useMutation } from "@tanstack/react-query";

const ManageEvents = () => {
  const { user } = useContext(AuthContext);
  const [myEvents, setMyEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedEvent, setSelectedEvent] = useState(null);
  const [startDate, setStartDate] = useState(new Date());
  const [modalError, setModalError] = useState("");

  const eventTypesList = [
    "Cleanup",
    "Plantation",
    "Donation",
    "Food Drive",
    "Workshop",
    "Other",
  ];

  const fetchMyEvents = async () => {
    setLoading(true);
    if (user?.email) {
      try {
        const token = await user.getIdToken();
        const res = await fetch(
          `https://b12-a10-future-box-server-eta.vercel.app/api/my-events?email=${user.email}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!res.ok) {
          throw new Error("Could not fetch events.");
        }
        const data = await res.json();
        setMyEvents(data);
      } catch (err) {
        console.error(err);
        toast.error("Could not fetch events.");
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyEvents();
  }, [user]);

  const updateEventOnServer = async ({ eventId, updatedEvent }) => {
    const token = await user.getIdToken();
    const res = await fetch(
      `https://b12-a10-future-box-server-eta.vercel.app/api/event/${eventId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedEvent),
      }
    );
    if (!res.ok) {
      throw new Error("Update failed");
    }
    return res.json();
  };

  const { mutate: updateEventMutation, isPending: isUpdating } = useMutation({
    mutationFn: updateEventOnServer,
    onSuccess: (data) => {
      if (data.modifiedCount > 0) {
        toast.success("Event Updated Successfully!");
        fetchMyEvents();
        document.getElementById("update_modal").close();
      } else {
        toast.error("No changes were made.");
      }
    },
    onError: (err) => {
      console.error(err);
      toast.error("Failed to update event.");
    },
  });

  const deleteEventFromServer = async (id) => {
    const token = await user.getIdToken();
    const res = await fetch(
      `https://b12-a10-future-box-server-eta.vercel.app/api/event/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!res.ok) {
      throw new Error("Delete failed");
    }
    return res.json();
  };

  const { mutate: deleteEventMutation } = useMutation({
    mutationFn: deleteEventFromServer,
    onSuccess: (data) => {
      if (data.deletedCount > 0) {
        toast.success("Event Deleted Successfully!");
        fetchMyEvents();
      }
    },
    onError: (err) => {
      console.error(err);
      toast.error("Failed to delete event.");
    },
  });

  const openUpdateModal = (event) => {
    setSelectedEvent(event);
    setStartDate(new Date(event.eventDate));
    setModalError("");
    document.getElementById("update_modal").showModal();
  };

  const handleUpdateEvent = (event) => {
    event.preventDefault();
    setModalError("");
    const form = event.target;

    const title = form.title.value;
    const description = form.description.value;
    const eventType = form.eventType.value;
    const thumbnail = form.thumbnail.value;
    const location = form.location.value;
    const eventDate = startDate;

    if (
      !title ||
      !description ||
      !eventType ||
      !thumbnail ||
      !location ||
      !eventDate
    ) {
      setModalError("Please fill out all fields.");
      return;
    }

    const updatedEvent = {
      title,
      description,
      eventType,
      thumbnail,
      location,
      eventDate,
    };

    updateEventMutation({ eventId: selectedEvent._id, updatedEvent });
  };

  const handleDeleteEvent = (id) => {
    if (!window.confirm("Are you sure you want to delete this event?")) {
      return;
    }
    deleteEventMutation(id);
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
                  className="textarea textarea-bordered h-32 w-full"
                ></textarea>
              </div>

              {modalError && (
                <p className="text-red-500 text-sm">{modalError}</p>
              )}

              <div className="modal-action mt-6">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isUpdating}
                >
                  {isUpdating ? (
                    <span className="loading loading-spinner"></span>
                  ) : (
                    "Save Changes"
                  )}
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
