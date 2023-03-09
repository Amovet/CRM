import React from 'react'
import {getTime_MM_SS} from "../../utils";

const AudioElement = ({audioRef, setDuration, progressBarRef, trackEnd, duration}) => {
    const onLoadedMetadata = () => {
        const seconds = audioRef.current.duration;
        setDuration(seconds);
        progressBarRef.current.max = seconds;
    };

    return (
        <div>
            <span className="player__duration">{
                getTime_MM_SS(duration)
            }</span>
            <audio
                src='http://ankean.site/media/beats/test_skilla.mp3'
                ref={audioRef}
                onLoadedMetadata={onLoadedMetadata}
                onEnded={() => trackEnd(onLoadedMetadata)}
            />
        </div>
    );
};
export default AudioElement;