import { Link, useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();
  console.error(error);

  return (
    <div
      id="error-page"
      className="flex flex-col items-center justify-center min-h-screen bg-base-100 text-center px-4"
    >
      <h1 className="text-9xl font-bold text-primary">404</h1>
      <h2 className="text-4xl font-semibold mt-4 mb-2">Page Not Found</h2>
      <p className="text-lg text-gray-600 mb-6">
        Sorry, we couldn’t find the page you’re looking for.
      </p>

      {error && (
        <p className="text-gray-500 italic mb-6">
          <i>{error.statusText || error.message}</i>
        </p>
      )}

      <Link to="/" className="btn btn-primary">
        Go Back Home
      </Link>
    </div>
  );
};

export default ErrorPage;
