<script lang="ts">
    import { Observable, switchMap, combineLatest, map } from 'rxjs';
    import { observe } from 'svelte-observable';

    import { default as FavoriteIcon } from '../components/icons/Favorite.svelte';
    import { toggleFavorite, fetchFavorites } from '../favorites/favorites';
    import { fetchTaplist, TapListEntry } from './taplist';
    import type { User } from '../auth';
    import Skeleton from './Skeleton.svelte';

    export let user: Observable<User>;

    const favs = user.pipe(
        switchMap(u => fetchFavorites(u.uid))
    );

    const taplistWithFavorites = combineLatest([fetchTaplist(), favs]).pipe(
        map(([taplist, favs]) => {
            return taplist.map(tap => ({
                ...tap,
                isFavorite: favs.some(fav => tap.brewery === fav.brewery)
            }))
        }));
    const taplist = observe<TapListEntry[]>(taplistWithFavorites);

    async function toggleFavBrewery(brewery: string) {
        toggleFavorite($user.uid, $favs, brewery);
    }
</script>

<div class="divide-gray-300 divide-y-2 divide-solid">
    {#await $taplist}
        <div class="vertical-spacing opacity-20"><Skeleton/></div>
        <div class="vertical-spacing opacity-20"><Skeleton/></div>
        <div class="vertical-spacing opacity-20"><Skeleton/></div>
        <div class="vertical-spacing opacity-20"><Skeleton/></div>
    {:then taplist}
        {#each taplist as beer, tapNr}
            <div class="flex flex-grow md:space-x-10 space-x-4 wrapper vertical-spacing pr-2 md:pr-4">
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
                    <button class="cursor-pointer" on:click="{() => toggleFavBrewery(beer.brewery)}">
                        <FavoriteIcon solid="{beer.isFavorite}" />
                    </button>
                </div>
            </div>
        {/each}
    {:catch err}
        <span class="text-red-400 text-center">Couldn't load taplist :/</span>
    {/await}
</div>

<style lang="postcss">
    .tap-text {
        @apply text-white font-display;
    }
    .vertical-spacing {
        @apply py-2 md:py-4;
    }
</style>