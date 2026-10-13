import { list_albums } from "$lib/api/songs";
import { SongStatus } from "$lib/types/responses";

export async function load() {
  try {
    const data = await list_albums();

    const albums = data.items

    const albumsWithProgress = albums.map((album) => {
        const total = album.songs.length;
        const downloaded = album.songs.filter((s) => s.status === SongStatus.downloaded).length;
        const percentage = total > 0 ? Math.round((downloaded / total) * 100) : 0;

        return {
          ...album,
          percentage
        };
    });

    return { ...data, items:albumsWithProgress };
  } catch (err) {
    console.error("--> Error en load:", err);
    return { items: [] };
  }
}
