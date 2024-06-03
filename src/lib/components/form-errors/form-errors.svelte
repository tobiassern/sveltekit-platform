<script lang="ts">
	import * as Alert from '$lib/components/ui/alert';
	import CircleAlert from 'lucide-svelte/icons/circle-alert';

	let { errors }: { errors?: string[] } = $props();
</script>

{#if errors}
	<Alert.Root variant="destructive">
		<CircleAlert class="h-4 w-4" />
		<Alert.Title>Error</Alert.Title>
		<Alert.Description>
			<ul>
				{#each errors as _error}
					<li>{_error}</li>
				{/each}
			</ul>
		</Alert.Description>
	</Alert.Root>
{/if}
