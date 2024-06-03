<script lang="ts">
	import { PUBLIC_APP_NAME } from '$env/static/public';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { verification_schema } from '$lib/schemas';
	import * as Form from '$lib/components/ui/form';
	import { FormErrors } from '$lib/components/form-errors';
	import LoaderCircle from 'lucide-svelte/icons/loader-circle';

	let { data } = $props();

	const form = superForm(data.form, {
		validators: zodClient(verification_schema)
	});

	const { form: formData, enhance, errors, delayed, submitting } = form;
</script>

<svelte:head>
	<title>2-Step Verification | {PUBLIC_APP_NAME}</title>
</svelte:head>
<Card.Root class="mx-auto w-full max-w-sm">
	<Card.Header>
		<Card.Title class="text-xl">2-Step Verification</Card.Title>
		<Card.Description class="space-y-1"
			><p>We sent a verification code to your email <strong>{$formData.email}</strong>.</p>
			<p>Enter the code from the email in the field below.</p>
		</Card.Description>
	</Card.Header>
	<Card.Content>
		<form method="POST" action="?/verify" class="grid gap-4" use:enhance>
			<input type="text" bind:value={$formData.email} name="email" hidden />
			<Form.Field {form} name="code">
				<Form.Control let:attrs>
					<Form.Label>OTP Code</Form.Label>
					<Input {...attrs} bind:value={$formData.code} />
				</Form.Control>
				{#if $errors.code?.length}
					<Form.FieldErrors />
				{/if}
			</Form.Field>
			<FormErrors errors={$errors._errors} />
			<Button type="submit" class="w-full" disabled={$submitting}
				>Verify{#if $delayed}<LoaderCircle class="ml-2 size-4 animate-spin" />{/if}</Button
			>
		</form>
		<div class="mt-4 text-center text-sm">
			Didn't receive an email?
			<a href="/sign-in" class="underline"> Resend </a>
		</div>
	</Card.Content>
</Card.Root>
