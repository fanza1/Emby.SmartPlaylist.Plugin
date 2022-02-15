import { AppData, AppPlaylist, AppPlaylists } from '~/app/types/appData';
import { demoAppData, demoAppPlaylistView } from '~/app/app.demo';
import { PlaylistInfo } from './types/playlist';

export const loadAppData = (appId: string): Promise<AppData> => {
    return new Promise<AppData>(res => {
        res({
            appId: appId,
            ...demoAppData,
        });
    });
};

export const saveAppPlaylist = (playlist: AppPlaylist): Promise<AppPlaylists | void> => {
    // tslint:disable-next-line:no-console
    return new Promise<AppPlaylists | void>(res => {
        res();
    });
};

export const deletePlaylist = (playlistId: string, remove: boolean): Promise<void> => {
    return new Promise<void>(res => {
        res();
    });
};

export const viewPlaylist = (playlistId: string, execute: boolean): Promise<PlaylistInfo> => {
    return new Promise<PlaylistInfo>(res => {
        res({
            ...demoAppPlaylistView
        });
    });
};
