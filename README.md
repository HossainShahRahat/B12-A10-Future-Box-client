# SocialEvents - Social Development Events Platform

### Live URL: [https://b12-a10-future-box-client.netlify.app](https://www.google.com/search?q=https://b12-a10-future-box-client.netlify.app)

-----

## Project Purpose

**SocialEvents** is a community-driven event management platform designed to connect local volunteers with social service opportunities. It serves as a central hub where users can discover, create, and join local events—such as road cleanups, tree plantations , and donation camps—all through a modern and interactive user interface.

-----

## Key Features

  * **Firebase Authentication**: Secure user registration and login with email/password and Google social sign-in. All password fields include validation (uppercase, lowercase, min-length).
  * **Event Creation & Management**: Logged-in users can create new social service events using a detailed form . A private "Manage Events" dashboard allows them to update or delete only the events they have created.
  * **Event Discovery with Search**: A public "Upcoming Events" page displays all future events in a grid layout. This page features a dynamic search by event name and a filter by event type, powered by the backend API.
  * **Join & Track Events**: Users can join any event from its details page. A separate "Joined Events" dashboard shows all events the user has joined, sorted by the event date as required.
  * **Protected Routes**: All user-specific dashboards (Create Event, Manage Events, Joined Events) are private/protected routes, ensuring only authenticated users can access them.
  * **Dark/Light Theme Toggle**: Includes a theme-switching toggle in the navbar that persists the user's choice (light or dark mode) across the entire application using `localStorage`.
  * **Responsive Design**: The entire application is fully responsive, offering a seamless experience on mobile, tablet, and desktop devices.
  * **Modern UI with Animations**: Built with Tailwind CSS and DaisyUI, with smooth page transitions and animations powered by Framer Motion.

-----

## NPM Packages Used

This project was built using the following key npm packages:

  * **`react`** & **`react-dom`**: For building the core user interface.
  * **`react-router-dom`**: For handling all client-side routing, protected routes, and loading data.
  * **`firebase`**: For all backend authentication services (user creation, login, Google sign-in) and generating JWTs for the server.
  * **`@tanstack/react-query`**: For managing asynchronous state, caching, and handling data mutations (like creating/updating events).
  * **`tailwindcss`** & **`daisyui`**: For all styling, UI components, and the light/dark theme system.
  * **`framer-motion`**: For adding animations and smooth page transitions as required.
  * **`react-hot-toast`**: For displaying user-friendly notifications for success and error messages (replaces default alerts).
  * **`react-datepicker`**: For the user-friendly date and time selection form field in the "Create Event" page.
  * **`react-icons`**: For including a variety of icons throughout the application.
