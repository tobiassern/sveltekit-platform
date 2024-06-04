<script lang="ts" context="module">
	import Home from 'lucide-svelte/icons/home';
	export type Navigation = { path: string; label: string; icon: typeof Users }[];
</script>

<script lang="ts">
	import { page } from '$app/stores';
	import type { Snippet } from 'svelte';
	import AppShellHeader from './app-shell-header.svelte';
	import AppShellSidebar from './app-shell-sidebar.svelte';
	import Users from 'lucide-svelte/icons/users';
	import Settings from 'lucide-svelte/icons/settings';

	let { children }: { children: Snippet } = $props();

	const navigation: Navigation = [
		{ path: '', label: 'Dashboard', icon: Home },
		{ path: '/users', label: 'Users', icon: Users },
		{ path: '/settings', label: 'Settings', icon: Settings }
	];
</script>

<div class="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
	<AppShellSidebar {navigation} />
	<div class="flex flex-col">
		<AppShellHeader {navigation} />
		<main class="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
			<div class="flex items-center">
				<h1 class="text-lg font-semibold md:text-2xl">{$page.data.pageTitle}</h1>
			</div>
			{@render children()}
			<!-- <div
				class="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm"
			>
				<div class="flex flex-col items-center gap-1 text-center">
					<h3 class="text-2xl font-bold tracking-tight">You have no products</h3>
					<p class="text-sm text-muted-foreground">
						You can start selling as soon as you add a product.
					</p>
					<Button class="mt-4">Add Product</Button>
				</div>
			</div> -->
		</main>
	</div>
</div>
