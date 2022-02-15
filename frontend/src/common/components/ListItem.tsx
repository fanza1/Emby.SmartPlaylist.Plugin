import * as React from 'react';
import { SmartTypes } from '~/app/app.const';
import { playlistReducer } from '~/app/state/playlist/playlist.reducer';
import { Playlist, PlaylistBasicData, SmartType } from '~/app/types/playlist';
import { Toggle } from './Toggle';

export type ListItemProps = {
    onEditClick(): void;
    onDeleteClick(): void;
    onViewClick(): void;
    onExecuteClick(): void;
    onUpdateData(playlist: Partial<Playlist>): void;
    playList: Playlist;
} & React.AllHTMLAttributes<HTMLDivElement> &
    BaseProps;

export const ListItem: React.FC<ListItemProps> = props => {
    const mainStyle = "listItem listItem-border emby-button plist-row" + (props.playList.enabled ? "" : " plist-row-disabled");
    const sub = props.playList.sourceType + (props.playList.sourceType === "Media Items" ? "" : " (" + props.playList.source.name + ")");

    return (
        <a className={mainStyle} data-ripple="false">
            <div className="listItemImageContainer">
                <i className="listItemIcon md-icon listItemIcon-transparent">{props.playList.smartType == SmartTypes[1] ? 'video_library' : 'playlist_play'}</i>
            </div>
            <div className="listItemBody">
                <div className="listItemBodyText" onClick={() => props.onEditClick()}>{props.playList.name}</div>
                <div className="listItemBodyTextSub" onClick={() => props.onEditClick()}>{sub}</div>
            </div>
            <div className='popper'>
                <span className={`tooltiptext`}>
                    <Toggle id={'toggle-' + props.playList.id} checked={props.playList.enabled} onToggled={(checked: boolean) => {
                        props.onUpdateData({
                            enabled: checked
                        });
                    }
                    } />
                </span>
                <button type="button" is="paper-icon-button-light" className="paper-icon-button-light icon-button-conditionalfocuscolor" onClick={() => props.onExecuteClick()}><i className="md-icon sp-icon">play_arrow</i></button>
                <button type="button" is="paper-icon-button-light" className="paper-icon-button-light icon-button-conditionalfocuscolor" onClick={() => props.onViewClick()}><i className="md-icon sp-icon">info</i></button>
                <button type="button" is="paper-icon-button-light" className="paper-icon-button-light icon-button-conditionalfocuscolor" onClick={() => props.onEditClick()}><i className="md-icon sp-icon">edit</i></button>
                <button type="button" is="paper-icon-button-light" className="paper-icon-button-light icon-button-conditionalfocuscolor" onClick={() => props.onDeleteClick()}><i className="md-icon sp-icon">delete</i></button>
            </div>
        </a>
    )

}