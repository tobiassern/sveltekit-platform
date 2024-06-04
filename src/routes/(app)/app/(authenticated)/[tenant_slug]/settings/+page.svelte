<script lang="ts">
	import type { PageData } from './$types.js';
	import { Separator } from '$lib/components/ui/separator/index.js';
	import { PUBLIC_APP_NAME } from '$env/static/public';
	let { data } = $props();
</script>

<svelte:head>
	<title>General | Settings | {data.tenant.name} | {PUBLIC_APP_NAME}</title>
</svelte:head>

<div class="space-y-6">
	<div>
		<h3 class="text-lg font-medium">General</h3>
		<p class="text-sm text-muted-foreground">Configure how you receive notifications.</p>
	</div>
	<Separator />
	<div>
		{data.tenant.id} - {data.tenant.slug}
		<form method="POST" action="?/delete-tenant">
			<button type="submit">Delete</button>
		</form>
	</div>
</div>
