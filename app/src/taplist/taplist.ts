import type { Observable } from 'rxjs';
import { ajax } from 'rxjs/ajax';

export function fetchTaplist(): Observable<TaplistResponse> {
    return ajax.getJSON('/api/taplist')
}

export interface TaplistResponse {
    taplist: [TapListEntry];
}

export interface TapListEntry {
    name: string;
    brewery: string;
    style: string;
    abv: number;
    isFavorite: boolean;
}