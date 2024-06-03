<script lang="ts">
	let { children } = $props();
</script>

<main
	class="mx-auto flex h-dvh w-full max-w-7xl items-center justify-center px-4 py-10 md:px-6 lg:px-8"
>
	{@render children()}
</main>
