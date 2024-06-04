<script lang="ts">
	import SidebarNav from './(components)/sidebar-nav.svelte';
	import { Separator } from '$lib/components/ui/separator';
	let { children } = $props();

	const sidebarNavItems = [
		{
			title: 'General',
			path: ''
		}
		// {
		// 	title: 'Notifications',
		// 	path: '/notifications'
		// },
		// {
		// 	title: 'App',
		// 	path: '/app'
		// }
	];
</script>

<Separator />
<div class="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
	<aside class="-mx-4 w-screen max-w-[100vw] overflow-scroll px-4 lg:w-1/5">
		<SidebarNav items={sidebarNavItems} />
	</aside>
	<div class="flex-1 lg:max-w-2xl">
		{@render children()}
	</div>
</div>
