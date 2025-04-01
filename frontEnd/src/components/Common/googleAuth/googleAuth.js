
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyClU_Edf0CrlDG0fBFi3rzYrd7-sBG290M",
    authDomain: "rupeeinsight-2024.firebaseapp.com",
    projectId: "rupeeinsight-2024",
    storageBucket: "rupeeinsight-2024.firebasestorage.app",
    messagingSenderId: "518048826628",
    appId: "1:518048826628:web:bebfbd76c4d385efbcbc51",
    measurementId: "G-5LGTLHME9R"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
