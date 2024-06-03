<script lang="ts">
	import { PUBLIC_APP_NAME } from '$env/static/public';
	import { page } from '$app/stores';
	import * as Card from '$lib/components/ui/card';
	import { Button, buttonVariants } from '$lib/components/ui/button/index.js';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { cn } from '$lib/utils';
	import autoAnimate from '@formkit/auto-animate';
	import { create_tenant_schema } from '$lib/schemas';
	import { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import * as Form from '$lib/components/ui/form';
	import ChevronRight from 'lucide-svelte/icons/chevron-right';
	import LoaderCircle from 'lucide-svelte/icons/loader-circle';
	import * as Avatar from '$lib/components/ui/avatar/index.js';

	let { data } = $props();
	let createTenantModalOpen = $state($page.url.searchParams.get('create') ? true : false);

	$effect(() => {
		if (!createTenantModalOpen && $page.url.searchParams.get('create')) {
			$page.url.searchParams.delete('create');
			window.location.href = $page.url.href;
		}
	});

	const form = superForm(data.form, {
		validators: zodClient(create_tenant_schema),
		onResult: ({ result }) => {
			if (result.type === 'success') {
				createTenantModalOpen = false;
			}
		}
	});

	const { form: formData, enhance, errors, delayed, submitting, submit } = form;
</script>

<svelte:head>
	<title>Organisations | {PUBLIC_APP_NAME}</title>
</svelte:head>
<main class="mx-auto flex h-dvh max-w-7xl items-center justify-center px-4 md:px-6 lg:px-8">
	<Card.Root class="mx-auto w-full max-w-sm">
		<Card.Header>
			<Card.Title>Your Organisations</Card.Title>
		</Card.Header>
		<Card.Content>
			<ul use:autoAnimate>
				{#each data.tenants as tenant}
					<li
						class="relative -mx-6 flex items-center justify-between gap-4 px-6 py-3 hover:bg-muted"
					>
						<div class="flex items-center gap-4">
							<Avatar.Root class="size-8">
								{#if tenant.logo_square_url}
									<Avatar.Image src={tenant.logo_square_url} alt={tenant.name} />
								{/if}
								<Avatar.Fallback class="uppercase">{tenant.slug.split('')[0]}</Avatar.Fallback>
							</Avatar.Root>
							<a href="/{tenant.slug}">
								<span class="absolute inset-0"></span>
								<span class="font-medium">{tenant.name}</span>
							</a>
						</div>
						<ChevronRight class="size-5" />
					</li>
				{:else}
					<li class="text-sm text-muted-foreground italic">No organisations created</li>
				{/each}
			</ul>
		</Card.Content>
		<Card.Footer>
			<Dialog.Root bind:open={createTenantModalOpen}>
				<Dialog.Trigger class={cn(buttonVariants({ variant: 'default' }), 'w-full')}
					>Create organisation</Dialog.Trigger
				>
				<Dialog.Content class="sm:max-w-[425px]">
					<Dialog.Header>
						<Dialog.Title>Create Organisation</Dialog.Title>
						<Dialog.Description>Get started with a new tenant.</Dialog.Description>
					</Dialog.Header>
					<form class="grid gap-4 py-4" method="POST" action="?/create-tenant" use:enhance>
						<Form.Field {form} name="name">
							<Form.Control let:attrs>
								<Form.Label>Name</Form.Label>
								<Input {...attrs} bind:value={$formData.name} placeholder="My organisation" />
							</Form.Control>
							{#if $errors.name?.length}
								<Form.FieldErrors />
							{/if}
						</Form.Field>
						<Form.Field {form} name="slug">
							<Form.Control let:attrs>
								<Form.Label>Slug</Form.Label>
								<Input {...attrs} bind:value={$formData.slug} placeholder="my-organisation" />
							</Form.Control>
							{#if $errors.slug?.length}
								<Form.FieldErrors />
							{/if}
						</Form.Field>
					</form>
					<Dialog.Footer>
						<Button onclick={submit} disabled={$submitting}
							>{#if $delayed}<LoaderCircle class="mr-2 size-4 animate-spin" />{/if}Create</Button
						>
					</Dialog.Footer>
				</Dialog.Content>
			</Dialog.Root>
		</Card.Footer>
	</Card.Root>
</main>
