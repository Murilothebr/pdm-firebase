// Import the functions you need from the SDKs you need
import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBwvA0M5-mPHv3gP1aCjfDAmqPNDQMwljM",
  authDomain: "pdm-cesar.firebaseapp.com",
  databaseURL: "https://pdm-cesar-default-rtdb.firebaseio.com",
  projectId: "pdm-cesar",
  storageBucket: "pdm-cesar.appspot.com",
  messagingSenderId: "142716163265",
  appId: "1:142716163265:web:c014f19faf49454208b040"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const db = getDatabase(app)

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});