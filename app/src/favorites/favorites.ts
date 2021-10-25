import { getDatabase, ref, set } from 'firebase/database';
import { object } from 'rxfire/database';
import { map } from 'rxjs';

export async function addFavorite(userId, brewery) {
    const db = getDatabase();
    return set(ref(db, `favorites/${userId}`), brewery);
}

export function fetchFavorites(userId) {
    const db = getDatabase();
    const favRef = ref(db, `favorites/${userId}`);
    return object(favRef).pipe(
        map(({ snapshot }) => snapshot.val()),
        map(val => Array.isArray(val) ? val : [val])
    );
}