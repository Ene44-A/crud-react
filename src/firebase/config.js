import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; //App de firestore
import { getStorage } from "firebase/storage"; //App de storage


const firebaseConfig = {
  apiKey: "AIzaSyAft4ElP_XOYRMuxz6-avMfeZ-6WEUFp5g",
  authDomain: "crud-react-a5412.firebaseapp.com",
  projectId: "crud-react-a5412",
  storageBucket: "crud-react-a5412.appspot.com",
  messagingSenderId: "713142407081",
  appId: "1:713142407081:web:d591c93350d2b840c8beb8"
};

const app = initializeApp(firebaseConfig);
export const db =  getFirestore(app); // Variable de Firestore 
export const storage = getStorage(app); //  Variable de Storage