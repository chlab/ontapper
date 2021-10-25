<script lang="ts">
    import { Observable, switchMap, combineLatest, map, startWith, tap } from 'rxjs';

    import { default as FavoriteIcon } from '../components/icons/Favorite.svelte';
    import { addFavorite, fetchFavorites } from '../favorites/favorites';
    import { fetchTaplist, TapListEntry } from './taplist';
    import type { User } from '../auth';

    export let user: Observable<User>;

    const beers = fetchTaplist();
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
        console.log(userId);
        const response = await addFavorite(userId, brewery);
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
                <button class="cursor-pointer" on:click="{() => toggleFavBrewery($user.uid, beer.brewery)}">
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