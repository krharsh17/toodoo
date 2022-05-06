import { initializeApp } from 'firebase/app';
import {getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword} from 'firebase/auth';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react'
import {ROUTE_HOME, ROUTE_LOGIN} from "../../utils/Constants";

// Mappings between the auth config options and environment variables
const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

// Initializing the FirebaseApp before making any API calls
initializeApp(firebaseConfig)

// Function to extract uid and email from FirebaseUser object
const formatAuthUser = (user) => ({
    uid: user.uid,
    email: user.email
});

/**
 * Custom hook for initializing and accessing the FirebaseAuth and FirebaseUser
 * objects wherever needed
 */
export default function useFirebaseAuth() {
    /**
     * State container for storing a subset of the FirebaseAuth object
     * {@see #formatAuthUser}
     */
    const [authUser, setAuthUser] = useState(null);

    // State container for storing the loading state of the auth auth object
    const [loading, setLoading] = useState(true);

    // Reference to the FirebaseAuth object from auth API
    const firebaseAuth = getAuth()

    // Reference to the Next.js router for making route changes based on auth activities
    const router = useRouter()

    // Event listener for listening to Auth state changes for the app
    const authStateChanged = async (authState) => {
        if (!authState) {

            // When authState is null, the user is not logged in
            setAuthUser(null)
            setLoading(false)

            // Redirect the user to login page
            await router.push(ROUTE_LOGIN)
            return;
        }

        // Set loading to true before starting to process AuthUser
        setLoading(true)
        const formattedUser = formatAuthUser(authState);
        setAuthUser(formattedUser);
        // Set loading false to indicate processing complete
        setLoading(false);

        // Redirect to the home page when logged in
        await router.push(ROUTE_HOME)
    };

    /**
     * Function to clear auth user when logging out
     */
    const clear = () => {
        setAuthUser(null);
    };

    // Functions to create new user, sign in, and sign out
    const createUser = (email, password) => createUserWithEmailAndPassword(firebaseAuth, email, password)
    const signIn = (email, password) => signInWithEmailAndPassword(firebaseAuth, email, password)
    const signOut = () => firebaseAuth.signOut().then(clear);

    // Effect for attaching Firebase state change listener when the component mounts
    useEffect(() => {
        const unsubscribe = firebaseAuth.onAuthStateChanged(authStateChanged);
        return () => unsubscribe();
    }, []);

    return {
        authUser,
        loading,
        signIn,
        createUser,
        signOut
    };
}
