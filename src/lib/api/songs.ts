import type { CreateSongResponse } from "$lib/types/songs";

const API_BASE = "http://localhost:8000";

export async function addSong(url: string, preview?: boolean):Promise<CreateSongResponse> {
  const response = await fetch(`${API_BASE}/songs${preview ? '?preview=true' : ''}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url })
  });

  if (!response.ok) {
    throw new Error(`Error al agregar canción: ${response.status}`);
  }

  return response.json();
}