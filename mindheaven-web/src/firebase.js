import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCaYo5alliAFTdQjo6AKf9vJwkvw63AP7c",
  authDomain: "mindheaven-2ca45.firebaseapp.com",
  databaseURL: "https://mindheaven-2ca45-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "mindheaven-2ca45",
  storageBucket: "mindheaven-2ca45.firebasestorage.app",
  messagingSenderId: "262454485333",
  appId: "1:262454485333:web:8dc9d921e43aa68999cfdc",
  measurementId: "G-R0ECVHZ0NK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const analytics = getAnalytics(app); // eslint-disable-line no-unused-vars

export { auth, db };