import { Observable, map } from 'rxjs';
import { ajax } from 'rxjs/ajax';

export function fetchTaplist(): Observable<TapListEntry[]> {
    return ajax.getJSON('/api/taplist').pipe(
        map((t: {taplist: TapListEntry[]}) => t.taplist)
    )
}

export interface TapListEntry {
    name: string;
    brewery: string;
    style: string;
    abv: number;
    isFavorite: boolean;
}