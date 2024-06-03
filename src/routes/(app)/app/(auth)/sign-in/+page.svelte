<script lang="ts">
	import { PUBLIC_APP_NAME } from '$env/static/public';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import AuthCard from '../auth-card.svelte';
	import { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { sign_in_email_schema } from '$lib/schemas';
	import * as Form from '$lib/components/ui/form';
	import { FormErrors } from '$lib/components/form-errors';
	import LoaderCircle from 'lucide-svelte/icons/loader-circle';
	let { data } = $props();

	const form = superForm(data.form, {
		validators: zodClient(sign_in_email_schema)
	});

	const { form: formData, enhance, errors, delayed, submitting } = form;
</script>

<svelte:head>
	<title>Sign In | {PUBLIC_APP_NAME}</title>
</svelte:head>
<AuthCard title="Login" description="Enter your email below to login to your account">
	<form method="POST" action="?/sign-in-email" class="grid gap-4" use:enhance>
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
			>Login{#if $delayed}<LoaderCircle class="ml-2 size-4 animate-spin" />{/if}</Button
		>
		<!-- <Button variant="outline" class="w-full">Login with Google</Button> -->
	</form>
	<div class="mt-4 text-center text-sm">
		Don&apos;t have an account?
		<a href="/sign-up" class="underline"> Sign up </a>
	</div>
</AuthCard>
