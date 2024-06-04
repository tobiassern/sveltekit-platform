<script lang="ts">
	import { page } from '$app/stores';
	import Bell from 'lucide-svelte/icons/bell';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import type { Navigation } from './app-shell.svelte';
	import * as Avatar from '$lib/components/ui/avatar';
	import { cn } from '$lib/utils';

	let { navigation }: { navigation: Navigation } = $props();
</script>

<aside class="hidden border-r bg-muted/40 md:block">
	<div class="flex h-full max-h-screen flex-col gap-2">
		<div class="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
			<a href="/" class="flex items-center gap-2 font-semibold">
				<Avatar.Root class="size-6">
					{#if $page.data.tenant?.logo_square_url}
						<Avatar.Image src={$page.data.tenant?.logo_square_url} alt={$page.data.tenant?.name} />
					{/if}
					<Avatar.Fallback class="uppercase">{$page.data.tenant?.name.split('')[0]}</Avatar.Fallback
					>
				</Avatar.Root>
				<span class="line-clamp-2">{$page.data.tenant?.name}</span>
			</a>
			<Button variant="outline" size="icon" class="ml-auto h-8 w-8">
				<Bell class="h-4 w-4" />
				<span class="sr-only">Toggle notifications</span>
			</Button>
		</div>
		<div class="flex-1">
			<nav class="grid items-start px-2 text-sm font-medium lg:px-4">
				{#each navigation as nav}
					{@const href = '/' + $page.params.tenant_slug + nav.path}
					{@const active =
						(!nav.path && href === $page.url.pathname) ||
						(nav.path && $page.url.pathname.startsWith(href))}
					<a
						{href}
						class={cn(
							'flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary',
							active ? 'bg-muted text-primary' : 'text-muted-foreground'
						)}
					>
						<svelte:component this={nav.icon} class="size-4" />
						{nav.label}
					</a>
				{/each}
			</nav>
		</div>
		<div class="mt-auto p-4">
			<Card.Root>
				<Card.Header class="p-2 pt-0 md:p-4">
					<Card.Title>Upgrade to Pro</Card.Title>
					<Card.Description>
						Unlock all features and get unlimited access to our support team.
					</Card.Description>
				</Card.Header>
				<Card.Content class="p-2 pt-0 md:p-4 md:pt-0">
					<Button size="sm" class="w-full">Upgrade</Button>
				</Card.Content>
			</Card.Root>
		</div>
	</div>
</aside>
