import { getFirestore, collection, query, where } from 'firebase/firestore';
import { collectionData } from 'rxfire/firestore';
import { map, Observable, tap } from 'rxjs';

import { app } from '../firebase';

const toggleArrItem = (arr: any[], item: any) => arr.includes(item) ? arr.filter(i => i !== item) : [ ...arr, item ];

// todo: get rid of array as firebase doesn't like arrays
export async function toggleFavorite(uid: string, favorties: string[], brewery: string) {
    // const db = getDatabase();
    // // const favs = toggleArrItem(favorties, brewery);
    // return push(ref(db, `favorites/${uid}`), brewery);
}

export function fetchFavorites(uid: string) {
    const db = getFirestore(app);
    const q = query(collection(db, 'favorites'), where('userId', '==', uid));
    return collectionData(q).pipe(
        map(docs => docs.map(d => d.brewery))
    );
}
