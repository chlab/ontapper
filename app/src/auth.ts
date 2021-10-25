import { getAuth, signInAnonymously, onAuthStateChanged } from 'firebase/auth';
import { authState } from 'rxfire/auth';

import { app } from './firebase';

export function initAuth() {
    const auth = getAuth(app);
    signInAnonymously(auth)
        .catch((error) => {
            console.error('Could not sign in anonymously', error.message, error.code);
        });

    return authState(auth);
}