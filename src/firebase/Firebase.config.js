import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const app = initializeApp({
  apiKey: "AIzaSyCrGgUwEtGAd20wZa4iGjP8I6KDr1bhoPQ",
  authDomain: "aizafgroup.firebaseapp.com",
  projectId: "aizafgroup",
  storageBucket: "aizafgroup.appspot.com",
  messagingSenderId: "255571021589",
  appId: "1:255571021589:web:c14b1bf55b167591b6631c",
  measurementId: "G-4TWF1TFNGL",
});
getAnalytics(app);
export const auth = getAuth(app);
export default app;
