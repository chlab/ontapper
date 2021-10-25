<script lang="ts">
    import { Observable, switchMap, combineLatest, map, startWith } from 'rxjs';
    import { ajax } from 'rxjs/ajax';

    import { default as FavoriteIcon } from './icons/Favorite.svelte';
    import { initAuth } from '../auth';
    import { addFavorite, fetchFavorites } from '../favorites/favorites';

    interface TapListEntry {
        name: string;
        brewery: string;
        style: string;
        abv: number;
        isFavorite: boolean;
    }

    // setup our sources
    const user = initAuth();
    const beers = ajax.getJSON('/api/taplist')
    const favs = user.pipe(
        switchMap(user => fetchFavorites(user.uid))
    );

    const taplist: Observable<[TapListEntry]> = combineLatest([beers, favs]).pipe(
        map(([taplist, favs]) => {
            return taplist.taplist.map(tap => ({
                ...tap,
                isFavorite: favs.includes(tap.brewery)
            }))
        }),
        startWith([])
    );

    async function toggleFavBrewery(userId: string, brewery: string) {
        const response = await addFavorite(userId, brewery);
        console.log(response);
    }
</script>

<div class="divide-gray-300 divide-y-2 divide-solid">
    {#each $taplist as beer, tapNr}
        <div class="flex flex-grow md:space-x-10 space-x-4 md:py-4 py-2 pr-2 md:pr-4">
            <div class="w-16 min-w-16 md:text-right text-center">
                <span class="text-big md:text-huge inline-block tap-text">{tapNr + 1}</span>
            </div>
            <div class="flex-1">
                <h2 class="text-3xl tap-text uppercase">
                    {beer.name}
                </h2>
                <span class="block tap-text font-bold text-2xl">
                    {beer.brewery}
                </span>
                <span class="block tap-text text-xl">
                    {beer.style} ({beer.abv}%)
                </span>
            </div>
            <div class="text-white w-8 pt-4">
                <button class="cursor-pointer" on:click="{() => toggleFavBrewery('zEbihVadZYPIpUvlRGPeHBB158B3', beer.brewery)}">
                    <FavoriteIcon solid="{beer.isFavorite}" />
                </button>
            </div>
        </div>
    {/each}
</div>

<style lang="postcss">
    .tap-text {
        @apply text-white font-display;
    }
</style>