import React, {useState, useEffect, useRef, useCallback} from 'react';
import playIco from '../../assets/img/play.svg';
import pauseIco from '../../assets/img/pause.svg';

const Controller = ({
                        audioRef,
                        progressBarRef,
                        streamAudioId,
                        id,
                        duration,
                        setTimeProgress,
                        isEnd,
                        setIsEnd,
                        setStreamAudio
                    }) => {
    const [isPlaying, setIsPlaying] = useState(false);

    const togglePlayPause = () => {
        setIsPlaying((prev) => !prev);
        setStreamAudio(id)
    };

    useEffect(() => {
        if (isEnd) {
            setIsPlaying(false);
            setIsEnd(false)
        }
    }, [isEnd])

    const playAnimationRef = useRef();

    useEffect(() => {
        if (id !== streamAudioId) {
            audioRef.current.pause();
        }
    }, [streamAudioId])

    const repeat = useCallback(() => {
        const currentTime = audioRef.current.currentTime;
        setTimeProgress(currentTime);
        progressBarRef.current.value = currentTime;
        progressBarRef.current.style.setProperty(
            '--range-progress',
            `${(progressBarRef.current.value / duration) * 100}%`
        );

        playAnimationRef.current = requestAnimationFrame(repeat);
    }, [audioRef, duration, progressBarRef, setTimeProgress]);

    useEffect(() => {
        if (isPlaying) {
            audioRef.current.play();
        } else {
            audioRef.current.pause();
        }
        playAnimationRef.current = requestAnimationFrame(repeat);
    }, [isPlaying, audioRef, repeat]);


    return (
        <div className='player__play-btn' onClick={togglePlayPause}>
            <img src={isPlaying ? pauseIco : playIco} alt="" className={isPlaying ? 'pause' : 'play'}/>
        </div>
    );
};

export default Controller;
