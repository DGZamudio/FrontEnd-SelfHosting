<script lang="ts">
    import type { songTpye } from "$lib/types/songs";
    import { toast } from 'svelte-sonner';
    import { addSong } from '$lib/api/songs';
    import SongInput from "$lib/components/SongInput.svelte";
    import AlbumDisplay from "$lib/components/AlbumDisplay.svelte";

    let { data } = $props();

    let url           = $state<string>('')
    let songData      = $state<songTpye[]>([])
    let isPlaying     = $state<boolean>(false)

    let isLoading = $state<boolean>(false)

    function handleAdd(e?: SubmitEvent, preview: boolean = true) {
        e?.preventDefault();

        if (url == '') {
            songData = [];
            isPlaying = false;
            return;
        }

        isLoading = true;
        addSong(url, preview)
        .then((song) => {
            if (preview) {
                songData = song.metadata;
                isPlaying = true;
                toast.success(song.type == "album" ? "Album cargado! si deseas agregarlo clickea de nuevo" : "Cancion cargada! si deseas agregarla clickea de nuevo");
            } else {
                if (song.result) {
                    toast.success(song.type == "album" ? "Album agregado correctamente!" : "Cancion agregada correctamente!");
                }
            }
        })
        .catch(() => {
            isPlaying = false;
            toast.error('Error al agregar la cancion/album :(');
        })
        .finally(() => {
            isLoading = false;
        });
    }
</script>

<div class="bg-secondary px-10 py-20 color-titles">
    <div class="flex flex-col items-center justify-around">
        <h1 class="font-titles text-center text-5xl md:text-6xl mb-10">Descarga tus canciones favoritas</h1>
        <SongInput
            bind:url
            songData={songData}
            isLoading={isLoading}
            isPlaying={isPlaying}
            handleAdd={handleAdd}
        />
    </div>
</div>
<h2 class="text-center text-4xl mt-10 w-full">Albums</h2>
<div class="flex justify-around gap-8 md:gap-15 flex-wrap p-10 md:p-15">
    {#if data.items}
        {#each data.items as album (album.id)}
            <AlbumDisplay
                {...album}
            />
        {/each}
    {/if}
</div>
