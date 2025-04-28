import { getApp, getApps, initializeApp } from "firebase/app";
import { getMessaging, getToken, isSupported } from "firebase/messaging";

// Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyDSHR5dDQ0qCb4SdCKt4FlVmcyoPVQtQ6g",
  authDomain: "alnahrain-lms.firebaseapp.com",
  projectId: "alnahrain-lms",
  storageBucket: "alnahrain-lms.firebasestorage.app",
  messagingSenderId: "667550107234",
  appId: "1:667550107234:web:c2e33d80a35b9cdb1eb33b",
  measurementId: "G-SFZYWHX002",
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

const messaging = async () => {
  const supported = await isSupported();
  return supported ? getMessaging(app) : null;
};

export const fetchToken = async () => {
  try {
    const fcmMessaging = await messaging();
    if (fcmMessaging) {
      const token = await getToken(fcmMessaging, {
        vapidKey: process.env.NEXT_PUBLIC_FIREBASE_FCM_VAPID_KEY,
      });
      return token;
    }
    return null;
  } catch (err) {
    console.error("An error occurred while fetching the token:", err);
    return null;
  }
};

export { app, messaging };
