import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import {getFirestore, collection, doc, setDoc} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCQwRSZG8BLalVQNDqhAgLpzPstfLDRhf0",
  authDomain: "imaginate-917b8.firebaseapp.com",
  projectId: "imaginate-917b8",
  storageBucket: "imaginate-917b8.appspot.com",
  messagingSenderId: "730971243605",
  appId: "1:730971243605:web:922276f8c8d6e14a9b40dc",
  measurementId: "G-C5388MK0TT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

export const database = {
  formatDoc: doc => {
    return {id: doc.id, ...doc.data()}
  },
  folder: collection(db, "folders"),
  files: collection(db, "files")
}


