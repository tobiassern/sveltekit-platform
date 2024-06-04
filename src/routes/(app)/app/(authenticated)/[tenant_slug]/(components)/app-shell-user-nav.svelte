<script lang="ts">
	import CircleUser from 'lucide-svelte/icons/circle-user';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import * as Avatar from '$lib/components/ui/avatar';
	import { page } from '$app/stores';
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger asChild let:builder>
		<Button builders={[builder]} variant="secondary" size="icon" class="rounded-full">
			<Avatar.Root class="size-6">
				{#if $page.data.user?.avatar_url}
					<Avatar.Image src={$page.data.user.avatar_url} alt={$page.data.user.avatar_url} />
				{/if}
				<Avatar.Fallback class="uppercase"><CircleUser class="size-6" /></Avatar.Fallback>
			</Avatar.Root>
			<span class="sr-only">Toggle user menu</span>
		</Button>
	</DropdownMenu.Trigger>
	<DropdownMenu.Content align="end">
		<DropdownMenu.Label class="font-normal">
			<div class="flex flex-col space-y-1">
				<p class="text-sm font-medium leading-none">
					{[$page.data.user.first_name, $page.data.user.last_name].join(' ')}
				</p>
				<p class="text-xs leading-none text-muted-foreground">{$page.data.user.email}</p>
			</div>
		</DropdownMenu.Label>
		<DropdownMenu.Separator />
		<DropdownMenu.Item href="/profile">Profile</DropdownMenu.Item>
		<DropdownMenu.Separator />
		<DropdownMenu.Item href="/sign-out">Logout</DropdownMenu.Item>
	</DropdownMenu.Content>
</DropdownMenu.Root>
