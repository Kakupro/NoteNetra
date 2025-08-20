import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getFunctions } from 'firebase/functions';
import { getRemoteConfig } from 'firebase/remote-config';
import { getPerformance } from 'firebase/performance';
import { getDatabase } from 'firebase/database';
import { getMessaging } from 'firebase/messaging';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDVjvznBKu1jJYS3STOd-le7Bmn8ToRe1s",
  authDomain: "notenetra.firebaseapp.com",
  databaseURL: "https://notenetra-default-rtdb.firebaseio.com",
  projectId: "notenetra",
  storageBucket: "notenetra.firebasestorage.app",
  messagingSenderId: "262092357638",
  appId: "1:262092357638:web:770c2e8f187a0ebc334387",
  measurementId: "G-1F2RGLK7RZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
const functions = getFunctions(app);
const remoteConfig = getRemoteConfig(app);
const performance = getPerformance(app);
const database = getDatabase(app);
const messaging = getMessaging(app);

export { app, auth, db, storage, functions, analytics, remoteConfig, performance, database, messaging };
