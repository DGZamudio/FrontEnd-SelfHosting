<script lang="ts">
    import type { CreateSongResponse } from "$lib/types/songs";
    import { UploadSimpleIcon } from 'phosphor-svelte'
    import { addSong } from '$lib/api/songs';

    let url        = $state<string>('')
    let coverUrl   = $state<string | null>()
    let isPlaying  = $state<boolean>(false)

    let addPromise = $state<Promise<CreateSongResponse> | null>(null);

    function handleAdd(e?:SubmitEvent , preview?: boolean) {
        e?.preventDefault()
        if (url == '') {
            coverUrl = null;
            isPlaying = false;
            return
        }
        addPromise = addSong(url, preview);
        addPromise.then((song) => {
            coverUrl = song.metadata.thumbnail;
            isPlaying = true;
        })
        .catch(() => {
            isPlaying = false;
            });
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
                                style="background-image: url({coverUrl})" 
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
                            <p>error: {error.message}</p>
                        {/await}
                    {/if}
                </div>

            </div>
            <form 
                class="flex w-full gap-2"
                onsubmit={(event) => handleAdd(event, false)}
            >
                <input 
                    type="url" 
                    class="bg-bg w-full border border-borders rounded-lg p-3 outline-none focus:ring-2 focus:ring-borders"
                    bind:value={url}
                    onchange={() => handleAdd()}
                    placeholder="Ingresa la URL de la canción, álbum o playlist"
                >
                <button type="submit" class="border border-borders cursor-pointer bg-primary hover:bg-borders transition rounded-lg justify-center items-center px-3">
                    <UploadSimpleIcon size={35} color='var(--color-bg)'/>
                </button>
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