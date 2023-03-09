import React from 'react'

const PlayerSlider = ({progressBarRef, audioRef}) => {

    const handleProgressChange = () => {
        audioRef.current.currentTime = progressBarRef.current.value;
    };

    return (
            <input
                type="range"
                ref={progressBarRef}
                defaultValue="0"
                onChange={handleProgressChange}
            />
    );
};

export default PlayerSlider;
