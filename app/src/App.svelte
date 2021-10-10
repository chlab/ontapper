<script>
	async function getTaplist() {
		const response = await fetch('/api/taplist');
		return response.json();
	}
</script>

<main class="bg-black min-h-screen">
	<div class="container mx-auto divide-white divide-y-2 divide-solid">
		{#await getTaplist()}
			<p class="font-display text-2xl text-center pt-10 text-white">loading awesome taplist</p>
		{:then taplist}
			{#each taplist.taplist as beer, tapNr}
				<div class="flex p-4 text-white font-display">
					<div class="flex-initial text-right" style="min-width: 4rem">
						<span class="text-huge align-top">{tapNr + 1}</span>
					</div>
					<div class="flex-grow ml-8">
						<h2 class="text-3xl uppercase">{beer.name}</h2>
						<span class="block font-bold text-2xl">{beer.brewery}</span>
						<span class="block text-xl">{beer.style} ({beer.abv}%)</span>
					</div>
				</div>
			{/each}
		{:catch error}
			<p class="font-display text-2xl text-center pt-10 text-red-400">loading awesome taplist</p>
		{/await}
	</div>
</main>
