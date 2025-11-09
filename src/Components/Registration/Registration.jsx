import { useContext, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../AuthProvider/AuthProvider";
import toast from "react-hot-toast";

const Registration = () => {
  const { createUser, updateUserProfile } = useContext(AuthContext);
  const [registerError, setRegisterError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const handleRegister = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const photo = form.photoURL.value;
    const email = form.email.value;
    const password = form.password.value;

    // reset error
    setRegisterError("");

    // Password validation
    if (password.length < 6) {
      setRegisterError("Password must be at least 6 characters long.");
      return;
    } else if (!/[A-Z]/.test(password)) {
      setRegisterError("Password must contain at least one uppercase letter.");
      return;
    } else if (!/[a-z]/.test(password)) {
      setRegisterError("Password must contain at least one lowercase letter.");
      return;
    }

    createUser(email, password)
      .then((result) => {
        console.log(result.user);

        updateUserProfile(name, photo)
          .then(() => {
            toast.success("Registration Successful!");
            navigate(from, { replace: true });
          })
          .catch((error) => {
            console.error("Profile update error", error);
            setRegisterError(error.message);
          });
      })
      .catch((error) => {
        console.error(error);
        setRegisterError(error.message);
      });
  };

  return (
    <div className="hero min-h-[calc(100vh-200px)] bg-base-100">
      <div className="hero-content flex-col w-full max-w-md">
        <div className="text-center">
          <h1 className="text-5xl font-bold">Register Now!</h1>
          <p className="py-6">
            Join our community and start making a difference today.
          </p>
        </div>
        <div className="card shadow-2xl bg-base-200 w-full">
          <form onSubmit={handleRegister} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Full Name</span>
              </label>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                className="input input-bordered justify-center w-full"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Photo URL</span>
              </label>
              <input
                type="text"
                name="photoURL"
                placeholder="http://example.com/photo.jpg"
                className="input input-bordered justify-center w-full"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <br />
              <input
                type="email"
                name="email"
                placeholder="your-email@example.com"
                className="input input-bordered justify-center w-full"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                className="input input-bordered justify-center w-full"
                required
              />
            </div>

            {registerError && (
              <p className="text-red-500 text-sm mt-2">{registerError}</p>
            )}

            <div className="form-control mt-6">
              <button className="btn btn-primary">Register</button>
            </div>
          </form>

          <p className="text-center pb-6">
            Already have an account?
            <Link to="/login" className="link link-primary ml-1">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Registration;
