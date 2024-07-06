import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBx3M8PVT3HUOb4s3vlhGl3Y1ASuXId0yk",
    authDomain: "portfolio-53545.firebaseapp.com",
    databaseURL: "https://portfolio-53545-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "portfolio-53545",
    storageBucket: "portfolio-53545.appspot.com",
    messagingSenderId: "699560174974",
    appId: "1:699560174974:web:fe4499f4d1963931577f2f",
    measurementId: "G-YRNVMWMNZH"
  };

  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
 
  export const db = getFirestore(app);
