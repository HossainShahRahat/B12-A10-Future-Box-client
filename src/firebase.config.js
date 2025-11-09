// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBW8MnhvOubsKoSEkmEPPlzIpllpDvKbxE",
  authDomain: "event-management-platfor-cb056.firebaseapp.com",
  projectId: "event-management-platfor-cb056",
  storageBucket: "event-management-platfor-cb056.firebasestorage.app",
  messagingSenderId: "811522114037",
  appId: "1:811522114037:web:7aa5d3b0c4c9b63d5ea0bc",
  measurementId: "G-DQ1F55Q0YX",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app };
