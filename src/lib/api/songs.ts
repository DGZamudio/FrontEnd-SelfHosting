import type { CreateSongResponse } from "$lib/types/songs";

const API_BASE = "http://localhost:8000";

export async function addSong(url: string, preview?: boolean):Promise<CreateSongResponse> {
  const response = await fetch(`${API_BASE}/songs${preview ? '?preview=true' : ''}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url })
  });

  if (!response.ok) {
    if (response.status == 409) {
        throw new Error("Esta canción ya esta incluida en el registro")
    }
    throw new Error(`Error al agregar canción: ${response.status}`);
  }

  return response.json();
}

export async function downloadSongFile(song_url: string, title?: string) {
    if (!title) {
        return
    }
    const response = await fetch(`${API_BASE}/songs/download`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url:song_url })
    });

    if (!response.ok) {
        throw new Error(`Error al descargar: ${response.status}`);
    }

    const blob = await response.blob();
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `${title}.mp3`;
    link.click();

    URL.revokeObjectURL(url);
}