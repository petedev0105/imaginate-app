import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import {getFirestore, collection, doc, setDoc} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBc5g1p6yxPBcyOblejgdKO1ZLJ_BC_16A",
  authDomain: "imaginate-ffffa.firebaseapp.com",
  databaseURL: "https://imaginate-ffffa-default-rtdb.firebaseio.com",
  projectId: "imaginate-ffffa",
  storageBucket: "imaginate-ffffa.appspot.com",
  messagingSenderId: "1017570082296",
  appId: "1:1017570082296:web:a47e09b6d7d20cac13aa0d",
  measurementId: "G-YYCE9G7EW9"
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


