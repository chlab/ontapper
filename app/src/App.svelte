<script>
	import './Tailwind.svelte';
	import Taplist from './components/Taplist.svelte';
	import Skeleton from './components/Skeleton.svelte';

	async function getTaplist() {
		const response = await fetch('/api/taplist');
		return response.json();
	}
</script>

<main class="min-h-screen">

	<div class="container mx-auto">
		{#await getTaplist()}
			<Skeleton/>
			<Skeleton/>
			<Skeleton/>
		{:then taplist}
			<Taplist taplist="{taplist.taplist}" />
		{:catch error}
			<p class="font-display text-2xl text-center pt-10 text-red-400">couldn't load taplist :/</p>
		{/await}
	</div>
</main>
