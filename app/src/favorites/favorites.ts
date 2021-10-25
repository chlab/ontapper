import { getDatabase, ref, set } from 'firebase/database';
import { object } from 'rxfire/database';
import { map, Observable } from 'rxjs';

const toggleArrItem = (arr: any[], item: any) => arr.includes(item) ? arr.filter(i => i !== item) : [ ...arr, item ];

// todo: get rid of array as firebase doesn't like arrays
export async function toggleFavorite(uid: string, favorties: string[], brewery: string) {
    const db = getDatabase();
    const favs = toggleArrItem(favorties, brewery);
    return set(ref(db, `favorites/${uid}`), favs);
}

export function fetchFavorites(uid: string): Observable<string[]> {
    const db = getDatabase();
    const favRef = ref(db, `favorites/${uid}`);
    return object(favRef).pipe(
        map(({ snapshot }) => snapshot.val()),
        map(val => Array.isArray(val) ? val : [val])
    );
}
