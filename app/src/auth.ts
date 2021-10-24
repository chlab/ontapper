import { getAuth, signInAnonymously, onAuthStateChanged } from 'firebase/auth';
import { app } from './firebase';
import { readable } from 'svelte/store';

export function initAuth() {
    const auth = getAuth(app);
    signInAnonymously(auth)
        .catch((error) => {
            console.error('Could not sign in anonymously', error.message, error.code);
        });

    const user = readable(null, set => {
        return onAuthStateChanged(auth, fireUser => {
            if (fireUser) {
                set(fireUser);
            } else {
                set(null);
            }
        });
    });

    return {
        user
    }
}