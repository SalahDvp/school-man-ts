// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth,browserLocalPersistence } from "firebase/auth";
import {getFirestore} from 'firebase/firestore'
import { getStorage } from "firebase/storage";
import { connectFunctionsEmulator, getFunctions } from 'firebase/functions';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA099r5pqYgGvJ4s9Zht7hhSo20jnG6Xhc",
  authDomain: "school-mvp-45caa.firebaseapp.com",
  projectId: "school-mvp-45caa",
  storageBucket: "school-mvp-45caa.appspot.com",
  messagingSenderId: "487013702699",
  appId: "1:487013702699:web:98b95c05de86b42abe1e6e",
  measurementId: "G-D6ZZ71X3ZX"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app,{ persistence: browserLocalPersistence});
const db = getFirestore(app)
const storage = getStorage(app);
const functions = getFunctions(app);
// connectFunctionsEmulator(functions, "127.0.0.1", 5001);
export {db , storage,functions}
export default app 