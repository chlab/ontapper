import { getFirestore, collection, query, where, addDoc, deleteDoc, doc } from 'firebase/firestore';
import { collectionData } from 'rxfire/firestore';
import type { Observable } from 'rxjs';

import { app } from '../firebase';

export async function toggleFavorite(userId: string, favs: Favorite[], brewery: string) {
    const fav = favs.find(fav => fav.brewery === brewery);
    const db = getFirestore(app);
    if (!fav) {
        return addDoc(collection(db, 'favorites'), {
            brewery,
            userId
        })
    } else {
        return deleteDoc(doc(db, 'favorites', fav.id));
    }
}

export function fetchFavorites(uid: string) {
    const db = getFirestore(app);
    const q = query(collection(db, 'favorites'), where('userId', '==', uid));
    return collectionData(q, { idField: 'id' }) as Observable<Favorite[]>;
}

export interface Favorite {
    id: string;
    brewery: string;
    userId: string;
}