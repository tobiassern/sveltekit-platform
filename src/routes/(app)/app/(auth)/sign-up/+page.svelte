<script lang="ts">
	import { PUBLIC_APP_NAME } from '$env/static/public';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { sign_up_email_schema } from '$lib/schemas';
	import { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import AuthCard from '../auth-card.svelte';
	import * as Form from '$lib/components/ui/form';
	import { FormErrors } from '$lib/components/form-errors';
	import LoaderCircle from 'lucide-svelte/icons/loader-circle';

	let { data } = $props();

	const form = superForm(data.form, {
		validators: zodClient(sign_up_email_schema)
	});

	const { form: formData, enhance, errors, delayed, submitting } = form;
</script>

<svelte:head>
	<title>Sign Up | {PUBLIC_APP_NAME}</title>
</svelte:head>
<AuthCard title="Sign Up" description="Enter your information to create an account">
	<form method="POST" action="?/sign-up-email" class="grid gap-4" use:enhance>
		<div class="grid grid-cols-2 gap-4">
			<Form.Field {form} name="first_name">
				<Form.Control let:attrs>
					<Form.Label>First name</Form.Label>
					<Input {...attrs} bind:value={$formData.first_name} placeholder="John" />
				</Form.Control>
				{#if $errors.first_name?.length}
					<Form.FieldErrors />
				{/if}
			</Form.Field>

			<Form.Field {form} name="last_name">
				<Form.Control let:attrs>
					<Form.Label>Last name</Form.Label>
					<Input {...attrs} bind:value={$formData.last_name} placeholder="Doe" />
				</Form.Control>
				{#if $errors.last_name?.length}
					<Form.FieldErrors />
				{/if}
			</Form.Field>
		</div>

		<Form.Field {form} name="email">
			<Form.Control let:attrs>
				<Form.Label>Email</Form.Label>
				<Input {...attrs} bind:value={$formData.email} placeholder="m@example.com" />
			</Form.Control>
			{#if $errors.email?.length}
				<Form.FieldErrors />
			{/if}
		</Form.Field>
		<FormErrors errors={$errors._errors} />
		<Button type="submit" class="w-full" disabled={$submitting}
			>Create an account{#if $delayed}<LoaderCircle class="ml-2 size-4 animate-spin" />{/if}</Button
		>
		<!-- <Button variant="outline" class="w-full">Sign up with GitHub</Button> -->
	</form>
	<div class="mt-4 text-center text-sm">
		Already have an account?
		<a href="/sign-in" class="underline"> Sign in </a>
	</div>
</AuthCard>
