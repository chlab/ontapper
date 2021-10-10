<script>
    export let message;
    export let isError = false;
</script>

<p
    class="font-display text-2xl text-center pt-10"
    class:text-red-400={isError}
    class:text-white={!isError}
>
    {message}
</p>