<script lang="ts">
	import './Tailwind.svelte';
	import Taplist from './taplist/Taplist.svelte';
	import { initAuth } from './auth';

	const user = initAuth();
</script>

<main class="min-h-screen">
	<div class="container mx-auto md:w-1/2">
		<Taplist user="{user}" />
	</div>
</main>
