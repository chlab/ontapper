<script lang="ts">
    export let taplist = [];

    async function subscribeToBrewery(brewery: string) {
        const result = await Notification.requestPermission();
        if (result === 'granted') {
            console.log('subscribe');
        } else {
            console.log('show error');
        }
    }
</script>

<div class="divide-gray-300 divide-y-2 divide-solid">
    {#each taplist as beer, tapNr}
        <div class="flex flex-grow md:space-x-10 space-x-4 md:py-4 py-2">
            <div class="w-16 min-w-16 md:text-right text-center">
                <span class="text-big md:text-huge inline-block tap-text">{tapNr + 1}</span>
            </div>
            <div class="">
                <h2 class="text-3xl tap-text uppercase">
                    {beer.name}
                </h2>
                <button class="block tap-text font-bold text-2xl" on:click="{() => subscribeToBrewery(beer.brewery)}">
                    {beer.brewery}
                </button>
                <span class="block tap-text text-xl">
                    {beer.style} ({beer.abv}%)
                </span>
            </div>
        </div>
    {/each}
</div>

<style lang="postcss">
    .tap-text {
        @apply text-white font-display;
    }
</style>