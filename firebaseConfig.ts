// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getReactNativePersistence, initializeAuth } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getDatabase } from 'firebase/database';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyALY9WKMUew0TrFUE2ZqA2_n3DHJo5I5BA",
  authDomain: "pdm-firebase-cc2e6.firebaseapp.com",
  projectId: "pdm-firebase-cc2e6",
  storageBucket: "pdm-firebase-cc2e6.appspot.com",
  messagingSenderId: "19692131140",
  appId: "1:19692131140:web:25e6644fbf334f7330bd11",
  measurementId: "G-14K2VXM4GP",
  name: ""
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const db = getDatabase(app)

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});