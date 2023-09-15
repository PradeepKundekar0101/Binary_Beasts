import { initializeApp } from "firebase/app";
import { getAuth,GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCtFWlrhknspViMpArj9SjXWD7LTt8XXj0",
    authDomain: "hackx-8c639.firebaseapp.com",
    projectId: "hackx-8c639",
    storageBucket: "hackx-8c639.appspot.com",
    messagingSenderId: "486815579524",
    appId: "1:486815579524:web:ef5b050d692be761e2f1d1",
    measurementId: "G-X5VX1YJXQJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
const auth = getAuth(app);
export {auth,provider};