<script>
	import { Drawer, drawerStore } from '@skeletonlabs/skeleton';
	import CustomizeDrawer from './CustomizeDrawer.svelte';
</script>

<Drawer position="left" width="w-[32rem]" blur="z-50" bgBackdrop="" duration={300}>
	{#if $drawerStore.id === 'customize'}
		<CustomizeDrawer />
	{/if}
</Drawer>
