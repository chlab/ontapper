import { Observable, filter } from 'rxjs';
import { getAuth, signInAnonymously, signOut } from 'firebase/auth';
import { authState } from 'rxfire/auth';

import { app } from './firebase';

export function initAuth(): Observable<User> {
    const auth = getAuth(app);
    try {
        signInAnonymously(auth);
    } catch (e) {
        console.error('Could not sign in anonymously', e);
    }

    return authState(auth).pipe(
        filter(user => !!user)
    );
}

export async function logout() {
    const auth = getAuth(app);
    await signOut(auth);
}
// expose logout function for easier local testing
globalThis.firebaseLogout = logout;

export interface User {
    uid: string;
}