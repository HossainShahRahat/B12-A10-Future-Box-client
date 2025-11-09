import { FiUsers, FiMapPin, FiCalendar } from "react-icons/fi";
import { Link } from "react-router-dom";

const Homepage = () => {
  return (
    <div className="container mx-auto px-4">
      {/* Banner Section */}
      <div
        className="hero min-h-[500px] rounded-lg overflow-hidden"
        style={{
          backgroundImage:
            "url(https://placehold.co/1200x500/a3e635/f0fdf4?text=Join+Us+for+Community+Cleanup!)",
        }}
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">
              Make a Difference in Your Community
            </h1>
            <p className="mb-5">
              Find and join local social service events like cleanups, tree
              plantations, and donation drives. Your community needs you.
            </p>
            <Link to="/upcoming-events">
              <button className="btn btn-primary">View Upcoming Events</button>
            </Link>
          </div>
        </div>
      </div>

      {/* Feature Section */}
      <section className="my-20">
        <h2 className="text-4xl font-bold text-center mb-10">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="card bg-base-100 shadow-xl border">
            <figure className="px-10 pt-10 text-primary">
              <FiMapPin className="text-6xl" />
            </figure>
            <div className="card-body items-center text-center">
              <h3 className="card-title">Discover Local Events</h3>
              <p>
                Browse a list of upcoming social service events happening right
                in your neighborhood. Filter by category to find what you care
                about.
              </p>
            </div>
          </div>

          <div className="card bg-base-100 shadow-xl border">
            <figure className="px-10 pt-10 text-primary">
              <FiUsers className="text-6xl" />
            </figure>
            <div className="card-body items-center text-center">
              <h3 className="card-title">Join or Create</h3>
              <p>
                See an event you like? Join with one click. Can't find one? Take
                the initiative and create your own event for others to join.
              </p>
            </div>
          </div>

          <div className="card bg-base-100 shadow-xl border">
            <figure className="px-10 pt-10 text-primary">
              <FiCalendar className="text-6xl" />
            </figure>
            <div className="card-body items-center text-center">
              <h3 className="card-title">Track Your Impact</h3>
              <p>
                Keep a record of all the events you've joined and organized. See
                the positive impact you're making in your community over time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="my-20">
        <h2 className="text-4xl font-bold text-center mb-10">
          Our Community in Action
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="rounded-lg overflow-hidden h-64">
            <img
              src="https://placehold.co/600x400/86efac/14532d?text=Tree+Plantation+Drive"
              alt="Tree Plantation"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="rounded-lg overflow-hidden h-64 col-span-1 md:col-span-2">
            <img
              src="https://placehold.co/800x400/fca5a5/7f1d1d?text=Donation+Camp"
              alt="Donation Camp"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="rounded-lg overflow-hidden h-64 col-span-1 md:col-span-2">
            <img
              src="https://placehold.co/800x400/93c5fd/1e3a8a?text=Road+Cleaning"
              alt="Road Cleaning"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="rounded-lg overflow-hidden h-64">
            <img
              src="https://placehold.co/600x400/fde047/713f12?text=Volunteers"
              alt="Volunteers"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="my-20 p-10 bg-base-200 rounded-lg">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="md:w-1/2 mb-6 md:mb-0">
            <h3 className="text-3xl font-bold">Stay Updated</h3>
            <p className="mt-2">
              Subscribe to our newsletter to get the latest updates on new
              events and community success stories right in your inbox.
            </p>
          </div>
          <div className="w-full md:w-1/2">
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="your-email@example.com"
                className="input input-bordered w-full"
              />
              <button className="btn btn-primary">Subscribe</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Homepage;
