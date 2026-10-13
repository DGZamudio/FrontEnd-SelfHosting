import type { SongStatus } from "./responses";

export interface CreateSongResponse {
  result?  : {
    id          : number,
    status      : string,
    source_url  : string,
    album_id    : number,
    title       : string,
    yt_video_id : string,
    added_at    : string,
    artist_id   : number
  },
  metadata : songTpye[],
  type     : "album" | "song"
}

export type songTpye = {
  video_id  : string;
  url       : string;
  title     : string;
  artist    : string;
  album     : string;
  thumbnail : string;
}

export interface ArtistSchema {
  id: number;
  name: string;
}

export interface SongSchema {
  id             : number;
  yt_video_id?   : string;
  title          : string;
  added_at?      : string;
  status         : SongStatus;
  source_url     : string;
  downloaded_at? : string;
}

export interface AlbumSchema {
  id              : number;
  title           : string;
  artist?         : ArtistSchema;
  songs           : SongSchema[];
  yt_playlist_id? : string;
  thumbnail?      : string;
}
