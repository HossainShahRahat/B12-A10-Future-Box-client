import { useContext, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AuthContext } from "../../AuthProvider/AuthProvider.jsx";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const CreateEvent = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [startDate, setStartDate] = useState(new Date());
  const [formError, setFormError] = useState("");

  const eventTypesList = [
    "Cleanup",
    "Plantation",
    "Donation",
    "Food Drive",
    "Workshop",
    "Other",
  ];

  const handleCreateEvent = (event) => {
    event.preventDefault();
    const form = event.target;

    const title = form.title.value;
    const description = form.description.value;
    const eventType = form.eventType.value;
    const thumbnail = form.thumbnail.value;
    const location = form.location.value;
    const eventDate = startDate;
    const userEmail = user?.email;

    if (
      !title ||
      !description ||
      !eventType ||
      !thumbnail ||
      !location ||
      !eventDate
    ) {
      setFormError("Please fill out all fields.");
      return;
    }

    const newEvent = {
      title,
      description,
      eventType,
      thumbnail,
      location,
      eventDate,
      creatorEmail: userEmail,
    };

    console.log(newEvent);
    setFormError("");

    fetch("/api/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newEvent),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          toast.success("Event Created Successfully!");
          navigate("/upcoming-events");
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to create event.");
        setFormError("An error occurred. Please try again.");
      });
  };

  return (
    <div className="container mx-auto px-4 my-12">
      <div className="max-w-3xl mx-auto bg-base-100 p-8 rounded-lg shadow-xl border">
        <h1 className="text-4xl font-bold text-center mb-6">
          Create a New Event
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Fill out the form below to organize a new community event.
        </p>

        <form onSubmit={handleCreateEvent} className="space-y-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Event Title</span>
            </label>
            <input
              type="text"
              name="title"
              placeholder="e.g., Mirpur Road Cleanup"
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
              placeholder="e.g., Mirpur 10, Dhaka"
              className="input input-bordered w-full"
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Thumbnail Image URL</span>
            </label>
            <input
              type="text"
              name="thumbnail"
              placeholder="http://example.com/image.png"
              className="input input-bordered w-full"
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Description</span>
            </label>
            <br />
            <textarea
              name="description"
              className="textarea textarea-bordered h-32 w-full"
              placeholder="Briefly describe what the event is about..."
            ></textarea>
          </div>

          {formError && <p className="text-red-500 text-sm">{formError}</p>}

          <div className="form-control mt-6">
            <button type="submit" className="btn btn-primary btn-lg w-full">
              Create Event
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateEvent;
