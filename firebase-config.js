import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDa6emBz4w7jysumzW40azZgJ4nV5yrt0Q",
  authDomain: "capsule-7cb0c.firebaseapp.com",
  projectId: "capsule-7cb0c",
  storageBucket: "capsule-7cb0c.appspot.com",
  messagingSenderId: "475981216580",
  appId: "1:475981216580:web:7ae95b923fadbd22273511",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
