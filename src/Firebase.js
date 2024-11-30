import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBQnRCLp252ZrIWXnnNY0l3NjUdaPUF7y0",
  authDomain: "videobattal.firebaseapp.com",
  projectId: "videobattal",
  storageBucket: "videobattal.appspot.com",
  messagingSenderId: "146793252243",
  appId: "1:146793252243:web:265c6b2be6b47790769466",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
