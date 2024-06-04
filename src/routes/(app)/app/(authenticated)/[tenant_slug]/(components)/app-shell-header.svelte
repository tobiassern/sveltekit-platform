<script lang="ts">
	import Menu from 'lucide-svelte/icons/menu';
	import Package2 from 'lucide-svelte/icons/package-2';
	import Search from 'lucide-svelte/icons/search';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import * as Sheet from '$lib/components/ui/sheet/index.js';
	import type { Navigation } from './app-shell.svelte';
	import { page } from '$app/stores';
	import { afterNavigate } from '$app/navigation';
	import { cn } from '$lib/utils';
	import * as Avatar from '$lib/components/ui/avatar';
	import UserNav from '../../(components)/user-nav.svelte';

	let { navigation }: { navigation: Navigation } = $props();
	let open = $state(false);
	afterNavigate(() => {
		open = false;
	});
</script>

<header class="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
	<Sheet.Root bind:open>
		<Sheet.Trigger asChild let:builder>
			<Button variant="outline" size="icon" class="shrink-0 md:hidden" builders={[builder]}>
				<Menu class="h-5 w-5" />
				<span class="sr-only">Toggle navigation menu</span>
			</Button>
		</Sheet.Trigger>
		<Sheet.Content side="left" class="flex flex-col">
			<nav class="grid gap-2 text-lg font-medium">
				<a href="/" class="flex items-center gap-2 text-lg font-semibold">
					<Avatar.Root class="size-6">
						{#if $page.data.tenant?.logo_square_url}
							<Avatar.Image
								src={$page.data.tenant?.logo_square_url}
								alt={$page.data.tenant?.name}
							/>
						{/if}
						<Avatar.Fallback class="uppercase"
							>{$page.data.tenant?.name.split('')[0]}</Avatar.Fallback
						>
					</Avatar.Root>
					<span class="sr-only">Acme Inc</span>
				</a>
				{#each navigation as nav}
					{@const href = '/' + $page.params.tenant_slug + nav.path}
					{@const active =
						(!nav.path && href === $page.url.pathname) ||
						(nav.path && $page.url.pathname.startsWith(href))}
					<a
						{href}
						class={cn(
							'mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 hover:text-foreground',
							active ? 'bg-muted text-foreground' : 'text-muted-foreground'
						)}
					>
						<svelte:component this={nav.icon} class="size-5" />
						{nav.label}
					</a>
				{/each}
			</nav>
			<!-- <div class="mt-auto">
				<Card.Root>
					<Card.Header>
						<Card.Title>Upgrade to Pro</Card.Title>
						<Card.Description>
							Unlock all features and get unlimited access to our support team.
						</Card.Description>
					</Card.Header>
					<Card.Content>
						<Button size="sm" class="w-full">Upgrade</Button>
					</Card.Content>
				</Card.Root>
			</div> -->
		</Sheet.Content>
	</Sheet.Root>
	<div class="w-full flex-1">
		<form>
			<div class="relative">
				<Search class="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
				<Input
					type="search"
					placeholder="Search products..."
					class="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
				/>
			</div>
		</form>
	</div>
	<UserNav />
</header>
