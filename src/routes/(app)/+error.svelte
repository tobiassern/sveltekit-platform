<script lang="ts">
	import '../../app.css';
	import { page } from '$app/stores';
</script>

<main class="grid h-dvh place-items-center bg-background px-6 py-24 sm:py-32 lg:px-8">
	<div class="text-center">
		<p class="text-base font-semibold text-primary">{$page.status}</p>
		<h1 class="mt-4 text-3xl font-bold tracking-tight text-primary sm:text-5xl">
			{$page.error?.message}
		</h1>
		<p class="mt-6 text-base leading-7 text-gray-600">
			Sorry, we couldn’t find the page you’re looking for.
		</p>
		<div class="mt-10 flex items-center justify-center gap-x-6">
			<a
				href="/"
				class="hover:bg-primary-muted rounded-md bg-primary px-3.5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
				>Go back home</a
			>
			<a href="/" class="text-sm font-semibold text-gray-900"
				>Contact support <span aria-hidden="true">&rarr;</span></a
			>
		</div>
	</div>
</main>
