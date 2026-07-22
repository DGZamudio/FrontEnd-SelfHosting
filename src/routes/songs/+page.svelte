<script lang="ts">
    import type { CreateSongResponse, songTpye } from "$lib/types/songs";
    import { DownloadSimpleIcon, UploadSimpleIcon } from 'phosphor-svelte'
    import { addSong, downloadSongFile } from '$lib/api/songs';

    let url           = $state<string>('')
    let songData      = $state<songTpye | undefined>()
    let isPlaying     = $state<boolean>(false)
    let localDownload = $state<boolean>(false)

    let addPromise = $state<Promise<CreateSongResponse> | null>(null);

    function handleAdd(e?:SubmitEvent , preview?: boolean) {
        e?.preventDefault()
        if (songData && localDownload) {
            handleDownload(url)
            return
        }

        if (url == '') {
            songData = undefined
            isPlaying = false;
            return
        }

        addPromise = addSong(url, preview);
        addPromise.then((song) => {
            songData = song.metadata
            isPlaying = true;
        })
        .catch(() => {
            isPlaying = false;
        });
    }

    async function handleDownload(url: string) {
        try {
            await downloadSongFile(url, songData?.title);
        } catch (e) {
            console.error(e);
        }
    }
</script>

<div class="bg-secondary px-10 py-20 color-titles">
    <div class="flex flex-col md:flex-row items-center justify-around">
        <div class="max-w-1/2">
            <h1 class="font-titles text-8xl">Descarga tus canciones favoritas</h1>
        </div>
        <div class="bg-primary rounded-lg p-5 flex flex-col gap-2 justify-center">
            <div>
                <div class="bg-orange-950 rounded-lg p-3">
                    <div class="relative w-80 h-80">
                        <!-- el disco (plato) -->
                        <div class="absolute inset-0 bg-gray-900 rounded-full flex justify-center items-center">
                            <div 
                                style="background-image: url({songData?.thumbnail})" 
                                class="bg-gray-500 bg-cover bg-center rounded-full flex justify-center items-center w-45 h-45"
                                class:spinning={isPlaying}
                            >
                                <div class="bg-black rounded-full p-2"></div>
                            </div>
                        </div>

                        <!-- el brazo, superpuesto -->
                        <div 
                            class="absolute top-2 right-6 w-2 h-24 bg-gray-300 rounded-full origin-top transition-transform duration-500"
                            style="transform: rotate({isPlaying ? -1 : -35}deg)"
                        >
                            <div class="absolute -top-2 -left-1.5 w-5 h-5 rounded-full bg-gray-300"></div>
                        </div>
                    </div>
                </div>
                <div class="text-bg">
                    {#if addPromise}
                        {#await addPromise}
                            <p>Buscando...</p>
                        {:then song}
                            <p>{song.metadata.title}</p>
                            <p>{song.metadata.artist}</p>
                        {:catch error}
                            <p>Error: {error.message}</p>
                        {/await}
                    {/if}
                </div>

            </div>
            <form 
                class="flex flex-col w-full gap-2"
                onsubmit={(event) => handleAdd(event, false)}
            >
                <div class="flex">
                    <input 
                        type="url" 
                        class="bg-bg w-full border border-borders rounded-lg p-3 outline-none focus:ring-2 focus:ring-borders"
                        bind:value={url}
                        onchange={() => handleAdd()}
                        placeholder="Ingresa la URL de la canción, álbum o playlist"
                    >
                    <button type="submit" class="border border-borders cursor-pointer bg-primary hover:bg-borders transition rounded-lg justify-center items-center px-3">
                        {#if localDownload}
                            <DownloadSimpleIcon size={35} color='var(--color-bg)'/>
                        {:else}
                            <UploadSimpleIcon size={35} color='var(--color-bg)'/> 
                        {/if}
                    </button>
                </div>
                <div class="flex justify-between items-center">
                    <p class="text-titles">Descargar localmente?</p>
                    <label class="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" bind:checked={localDownload} class="sr-only peer">
                        <div class="group peer ring-0 bg-bg  rounded-full outline-none duration-300 after:duration-300 w-12 h-6  shadow-md peer-checked:bg-primary  peer-focus:outline-none  after:content-[''] after:rounded-full after:absolute after:bg-secondary after:outline-none after:h-4 after:w-4 after:top-1 after:left-1 after:flex after:justify-center after:items-center peer-checked:after:translate-x-6 peer-hover:after:scale-95">
                        </div>
                    </label>
                </div>
            </form>
        </div>
    </div>
</div>

<style>
  .spinning {
    animation: spin 3s linear infinite;
  }
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
</style>