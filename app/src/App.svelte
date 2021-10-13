<script>
	async function getTaplist() {
		const response = await fetch('/api/taplist');
		return response.json();
	}
</script>

<main class="bg-black min-h-screen">

	<!-- <div class="mx-auto mt-20">
		<div class="flex animate-pulse flex-row items-center justify-center space-x-5">
			<div class="w-20 h-20">
				<span class="text-big text-white md:text-huge align-top">10</span>
			</div>
			<div class="flex flex-col space-y-3">
				<div class="w-36 bg-gray-300 h-6 rounded-md"></div>
				<div class="w-24 bg-gray-300 h-6 rounded-md"></div>
			</div>
		</div>
	</div> -->

	<div class="container mx-auto divide-gray-300 divide-y-2 divide-solid">
		{#await getTaplist()}
			<p class="font-display text-2xl text-center pt-10 text-white">loading awesome taplist</p>
		{:then taplist}
			{#each taplist.taplist as beer, tapNr}
				<div class="flex flex-grow md:space-x-10 space-x-4 md:py-4 py-2">
					<div class="w-16 min-w-16 md:text-right text-center">
						<span class="text-big md:text-huge inline-block text-white font-display">{tapNr + 1}</span>
					</div>
					<div class="">
						<h2 class="text-3xl text-white font-display uppercase">{beer.name}</h2>
						<span class="block text-white font-display font-bold text-2xl">{beer.brewery}</span>
						<span class="block text-white font-display text-xl">{beer.style} ({beer.abv}%)</span>
					</div>
				</div>
			{/each}
		{:catch error}
			<p class="font-display text-2xl text-center pt-10 text-red-400">couldn't load taplist :/</p>
		{/await}
	</div>
</main>
