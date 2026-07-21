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
    metadata : {
        video_id  : string,
        url       : string,
        title     : string,
        artist    : string,
        album     : string,
        thumbnail : string
    } 
}