<script lang="ts">
    import { API_BASE } from "$lib/api/songs";
    import type { ArtistSchema } from "$lib/types/songs";

    interface Props {
      id          : number;
      title       : string;
      artist?     : ArtistSchema;
      percentage? : number;
    }
    let { id, title, artist, percentage }: Props = $props()

    let safeArtist = $derived(encodeURIComponent(artist?.name ?? ""));
    let safeAlbum = $derived(encodeURIComponent(title));

    let albumCover = $derived(`${API_BASE}/static/songs/${safeArtist}/${safeAlbum}/cover.jpg`);
</script>

<a href="/songs/{id}" class="text-center w-50 transition-transform duration-300 hover:-translate-y-2 cursor-pointer">
    <div class="relative">
        <img
            class="rounded-lg shadow-md size-50"
            src={albumCover}
            alt={`${title} album cover`}
            title={title}
        >
        {#if percentage != 0 && percentage != 100}
            <div class="rounded-lg absolute bottom-0 right-0 z-1 w-full bg-slate-800 opacity-50" style:height={`${percentage}%`} ></div>
        {/if}
    </div>

    <h3 class="font-semibold text-slate-800">{title}</h3>
    <h4 class="text-sm text-slate-500">{artist?.name}</h4>
</a>
