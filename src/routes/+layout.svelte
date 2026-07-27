<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
    import { resolve } from '$app/paths';
    import { EqualizerIcon } from 'phosphor-svelte'
    import { Toaster } from 'svelte-sonner';

	let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>
<nav class="flex justify-between items-center gap-3 w-full p-5 bg-primary">
    <div class="flex gap-10">
        <a href={resolve('/')}>
            <h1 class="text-lg">Home</h1>
        </a>
        <a href={resolve('/songs')}>
            <h1 class="text-lg">Song Manager</h1>
        </a>
    </div>
    <div class="flex items-end justify-end gap-2 flex-1 text-center">
        <h1 class="font-titles text-2xl text-secondary!">Z-Tools</h1>
        <EqualizerIcon size={35} color="var(--color-secondary)"/>
    </div>
</nav>
<Toaster />
{@render children()}
