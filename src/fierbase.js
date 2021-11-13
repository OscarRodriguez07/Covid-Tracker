// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDzteLWYWtVkNN5SfmTYSkELr0AhlVf4BU",
  authDomain: "covid-tracker-365ba.firebaseapp.com",
  projectId: "covid-tracker-365ba",
  storageBucket: "covid-tracker-365ba.appspot.com",
  messagingSenderId: "373382223441",
  appId: "1:373382223441:web:4cdf3a1c295561484e0a70",
  measurementId: "G-992H4MFTFN",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
