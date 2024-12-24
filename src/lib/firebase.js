import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { writable } from 'svelte/store';

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Create a reactive store for auth state
function createAuthStore() {
    const { subscribe, set } = writable(auth);

    auth.onAuthStateChanged(user => {
        set(auth);
    });

    return {
        subscribe
    };
}

export const authStore = createAuthStore();
export default app;
