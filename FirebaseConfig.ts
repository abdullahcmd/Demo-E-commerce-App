// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {initializeAuth, getReactNativePersistence} from 'firebase/auth'
import { getAnalytics } from "firebase/analytics";
import  ReactNativeAsyncStorage  from "@react-native-async-storage/async-storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDl2nK9aeIB6OSZNKsn3y03srl8l1zZJsU",
  authDomain: "fir-e-commerce-a.firebaseapp.com",
  projectId: "fir-e-commerce-a",
  storageBucket: "fir-e-commerce-a.firebasestorage.app",
  messagingSenderId: "1084781884656",
  appId: "1:1084781884656:web:ba471ea49a589802b8be35",
  measurementId: "G-N4CYERXYNW"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth=initializeAuth(app,{persistence: getReactNativePersistence(ReactNativeAsyncStorage)});
const analytics = getAnalytics(app);