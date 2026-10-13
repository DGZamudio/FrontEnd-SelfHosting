import type { PaginatedResponse, PaginationType, SongStatus } from "$lib/types/responses";
import type { AlbumSchema, CreateSongResponse, SongSchema } from "$lib/types/songs";

export const API_BASE = "http://localhost:8000";

export async function list_songs({ pagination, status, album } : {pagination?: PaginationType, status?: SongStatus, album?: string}): Promise<PaginatedResponse<SongSchema>> {
  let url = `${API_BASE}/music/songs`

  if (pagination || status || album) {
    const params = new URLSearchParams()

    if (status) {
      params.append("status", String(status))
    }

    if (pagination) {
      params.append("page", String(pagination?.page))
      params.append("page_size", String(pagination?.page_size))
    }

    if (album) {
      params.append("album", album)
    }

    const queryString = params.toString();
    if (queryString) {
      url += `?${queryString}`;
    }
  }

  const response = await fetch(url, {
    method: "GET"
  });

  if (!response.ok) {
    throw new Error(`Error al listar: ${response.status}`)
  }

  return response.json();
}

export async function list_albums(pagination?: PaginationType): Promise<PaginatedResponse<AlbumSchema>> {
  let url = `${API_BASE}/music/albums`

  if (pagination) {
    const params = new URLSearchParams()

    params.append("page", String(pagination?.page))
    params.append("page_size", String(pagination?.page_size))

    const queryString = params.toString();
    if (queryString) {
      url += `?${queryString}`;
    }
  }

  const response = await fetch(url, {
    method: "GET"
  });

  if (!response.ok) {
    throw new Error(`Error al listar: ${response.status}`)
  }

  return response.json();
}

export async function addSong(url: string, preview?: boolean):Promise<CreateSongResponse> {
  const response = await fetch(`${API_BASE}/music${preview ? '?preview=true' : ''}`, {
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
