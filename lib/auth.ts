import { useEffect, useState } from "react";
import { User as FirebaseUser, signOut as firebaseSignOut, browserLocalPersistence, browserSessionPersistence, setPersistence, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";

import { auth } from "@/firebase/firebase-config"

export async function signIn(email: string, password: string, rememberMe: boolean = false) {
  await setPersistence(auth, rememberMe ? browserLocalPersistence : browserSessionPersistence);
  return signInWithEmailAndPassword(auth, email, password);
}

export async function signOut() {
  return firebaseSignOut(auth);
}

export function useUser() {
  const [user, setUser] = useState<FirebaseUser | null | false>(false);

  useEffect(() => {
    return onAuthStateChanged(auth, (user) => setUser(user));
  }, []);

  return user;
}



// useEffect(() => {
//   const unsub = onAuthStateChanged(auth, async (user) => {
//     try {
//       if (user) {
//         setUser(user);
//         setIsAuthenticated(true);
//         router.replace('/dashboard');
//       } else {
//         setIsAuthenticated(false);
//         setUser(null);
//         router.replace('/Auth');
//       }
//     } catch (error) {
//       console.error('Error in onAuthStateChanged:', error);
//       // Handle the error as needed, such as setting an error state or logging the error
//     }
//   });

//   return () => unsub(); // Cleanup function to unsubscribe when the component unmounts
// }, []);