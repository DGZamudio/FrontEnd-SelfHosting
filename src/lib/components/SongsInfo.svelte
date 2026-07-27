<script lang="ts">
    import type { songTpye } from "$lib/types/songs";
    import { fade, fly } from "svelte/transition";

    interface Props {
        visible  : boolean;
        songData : songTpye[];
    }
    let { visible, songData }: Props = $props()
</script>

{#if visible}
    <!-- From Uiverse.io by emmanuelh-dev --> 
    <div in:fly={{ x: 200, duration: 1000 }} out:fade class="bg-primary border border-titles w-80 h-80 rounded-lg absolute -left-90 flex flex-col">
        <div class="flex p-2 gap-1 shrink-0">
            <div class="">
                <span class="bg-red-500 inline-block center w-3 h-3 rounded-full"></span>
            </div>
            <div class="circle">
                <span class="bg-yellow-500 inline-block center w-3 h-3 rounded-full"></span>
            </div>
            <div class="circle">
                <span class="bg-green-500 box inline-block center w-3 h-3 rounded-full"></span>
            </div>
        </div>
        <div class="card__content p-5 overflow-y-auto flex-1 min-h-0 text-bg">
            <div class="font-bold text-lg text-center text-titles">
                <p>{songData?.[0]?.album}</p>
                <p>{songData?.[0]?.artist}</p>
            </div>

            {#each songData as song,i (song.video_id)}
                <p class="truncate">{i+1}. {song.title}</p>
            {/each}
        </div>
    </div>
{/if}