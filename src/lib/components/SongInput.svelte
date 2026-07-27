<script lang="ts">
    import type { songTpye } from '$lib/types/songs';
    import { UploadSimpleIcon, XIcon } from 'phosphor-svelte'
    import SongsInfo from './SongsInfo.svelte';
    import ChiwiLoader from './ChiwiLoader.svelte';
    import { fade } from 'svelte/transition';


    interface Props {
        url       : string;
        songData  : songTpye[];
        isLoading : boolean;
        isPlaying : boolean;
        handleAdd : (event?: SubmitEvent, preview?: boolean) => void;
    }

    let { url = $bindable(), isLoading, songData, isPlaying, handleAdd }: Props = $props();
</script>

<div class="bg-primary rounded-lg p-5 flex flex-col gap-2 justify-center relative">
    <SongsInfo visible={songData.length > 0} songData={songData}/>

    {#if isLoading}
        <div transition:fade class="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center z-10">
            <ChiwiLoader/>
        </div>
    {/if}

    <div>
        <div class="bg-orange-950 rounded-lg p-3">
            <div class="relative w-80 h-80">
                <!-- el disco (plato) -->
                <div class="absolute inset-0 bg-gray-900 rounded-full flex justify-center items-center">
                    <div 
                        style="background-image: url({songData?.[0]?.thumbnail ?? ""})" 
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
    </div>
    <form 
        class="flex flex-col w-full gap-2"
        onsubmit={(event) => handleAdd(event, false)}
    >
        <div class="flex">
            <div class="flex bg-bg w-full border border-borders rounded-lg focus-within:ring-2 focus-within:ring-borders">
                <input 
                    class="p-3 flex-1 outline-none"
                    type="url" 
                    bind:value={url}
                    onchange={() => handleAdd()}
                    placeholder="Ingresa la URL de la canción, álbum o playlist"
                >
                {#if url != ""}
                    <button class="p-2 cursor-pointer hover:transform" onclick={() => {url = ""}}>
                        <XIcon color="gray"/>
                    </button>
                {/if}
            </div>

            <button type="submit" disabled={isLoading} class="border border-borders cursor-pointer bg-primary hover:bg-borders transition rounded-lg justify-center items-center px-3">
                <UploadSimpleIcon size={35} color='var(--color-bg)'/> 
                <!-- {#if localDownload}
                    <DownloadSimpleIcon size={35} color='var(--color-bg)'/>
                {:else}
                    
                {/if} -->
            </button>
        </div>
        <!-- <div class="flex justify-between items-center">
            <p class="text-titles">Descargar localmente?</p>
            <label class="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" bind:checked={localDownload} class="sr-only peer">
                <div class="group peer ring-0 bg-bg  rounded-full outline-none duration-300 after:duration-300 w-12 h-6  shadow-md peer-checked:bg-primary  peer-focus:outline-none  after:content-[''] after:rounded-full after:absolute after:bg-secondary after:outline-none after:h-4 after:w-4 after:top-1 after:left-1 after:flex after:justify-center after:items-center peer-checked:after:translate-x-6 peer-hover:after:scale-95">
                </div>
            </label>
        </div> -->
    </form>
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