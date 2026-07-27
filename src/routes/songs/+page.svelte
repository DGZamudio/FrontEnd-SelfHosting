<script lang="ts">
    import type { songTpye } from "$lib/types/songs";
    import { toast } from 'svelte-sonner';
    import { addSong } from '$lib/api/songs';
    import SongInput from "$lib/components/SongInput.svelte";

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
    <div class="flex flex-col md:flex-row items-center justify-around">
        <div class="max-w-1/2">
            <h1 class="font-titles text-8xl">Descarga tus canciones favoritas</h1>
        </div>
        <SongInput
            bind:url
            songData={songData}
            isLoading={isLoading}
            isPlaying={isPlaying}
            handleAdd={handleAdd}
        />
    </div>
</div>