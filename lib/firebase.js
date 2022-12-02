import firebase from 'firebase/compat/app';
import "firebase/compat/firestore";
import "firebase/compat/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAxz4Eo_25_OH0lJrfRQNnTSWc79jrtks4",
  authDomain: "signal-20.firebaseapp.com",
  projectId: "signal-20",
  storageBucket: "signal-20.appspot.com",
  messagingSenderId: "1076685679560",
  appId: "1:1076685679560:web:223306d12692a8d531eefd",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}


//Auth
export const auth = firebase.auth();

// Firestore
export const db = firebase.firestore();
export const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp;
export const fromMillis = firebase.firestore.Timestamp.fromMillis
export const increment = firebase.firestore.FieldValue.increment;


export function postToJSON(doc) {
  const data = doc.data();
  return {
    ...data,
    createdAt: data.createdAt.toMillis(),
    updatedAt: data.updatedAt.toMillis(),
  };
}