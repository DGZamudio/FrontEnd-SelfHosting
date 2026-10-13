<script lang="ts">
    let { data } = $props();
</script>

{#each data.items as song (song.id)}
    {song.title}
{/each}
