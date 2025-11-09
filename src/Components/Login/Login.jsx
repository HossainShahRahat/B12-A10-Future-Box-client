import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthProvider/AuthProvider";
import toast from "react-hot-toast";
import { FaGoogle } from "react-icons/fa";

const Login = () => {
  const { signIn, googleLogin } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState("");

  const from = location.state?.from?.pathname || "/";

  const handleLogin = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    setError(""); // Clear previous errors

    if (!email || !password) {
      setError("Please fill in both fields.");
      return;
    }

    signIn(email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        toast.success("Successfully logged in!");
        navigate(from, { replace: true });
      })
      .catch((error) => {
        console.error(error);
        setError("Invalid email or password. Please try again.");
      });
  };

  const handleGoogleSignIn = () => {
    googleLogin()
      .then((result) => {
        console.log(result.user);
        toast.success("Successfully logged in with Google!");
        navigate(from, { replace: true });
      })
      .catch((error) => {
        console.error(error);
        setError(error.message);
      });
  };

  return (
    <div className="hero min-h-[calc(100vh-200px)] bg-base-100">
      <div className="hero-content flex-col w-full max-w-md">
        <div className="text-center">
          <h1 className="text-5xl font-bold">Login now!</h1>
          <p className="py-6">
            Welcome back. Please login to access your events.
          </p>
        </div>
        <div className="card shadow-2xl bg-base-200 w-full">
          <form onSubmit={handleLogin} className="card-body">
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

            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

            <div className="form-control mt-6">
              <button className="btn btn-primary">Login</button>
            </div>
          </form>

          <div className="divider px-8">OR</div>

          <div className="card-body pt-0">
            <button
              onClick={handleGoogleSignIn}
              className="btn btn-outline btn-primary w-full flex items-center gap-2"
            >
              <FaGoogle />
              Login with Google
            </button>
          </div>

          <p className="text-center pb-6">
            New to SocialEvents?
            <Link to="/register" className="link link-primary ml-1">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
