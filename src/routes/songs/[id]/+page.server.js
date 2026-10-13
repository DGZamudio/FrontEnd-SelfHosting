import { list_songs } from "$lib/api/songs";

export async function load({ params }) {
  try {
    const data = await list_songs({ album: params.id });

    return data;
  }
  catch (err) {
    console.error("--> Error en load:", err);
    return { items: [] };
  }
}
