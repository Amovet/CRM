import React, { useRef, useState} from 'react'
import {connect} from "react-redux";
import downloadIco from "../../assets/img/download.svg";
import exitIco from "../../assets/img/exit.svg";
import PlayerSlider from "./player_slider";
import Controller from "./controller";
import AudioElement from "./audio_element";
import {setStreamAudio} from "../../redux/calls_reducer";

function Player({ id,setStreamAudio,streamAudioId}) {
    const [timeProgress, setTimeProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isEnd, setIsEnd] = useState(0);

    const audioRef = useRef();
    const progressBarRef = useRef();

    let trackEnd = (getInit) =>{
        setTimeProgress(0)
        setDuration(0)
        setIsEnd(true)
        getInit()
    }

    return (
            <div className={`player ${id==streamAudioId?"isPlaying":''}`}>
                <AudioElement {...{audioRef, setDuration, progressBarRef,trackEnd,duration}}/>
                <Controller {...{audioRef, progressBarRef, duration, streamAudioId,setTimeProgress,isEnd,id,setIsEnd,setStreamAudio}}/>
                <PlayerSlider{...{ progressBarRef, audioRef, timeProgress, duration }}/>
                <a href='http://ankean.site/media/beats/test_skilla.mp3' download={true} target="_blank" className='player__download'>
                    <img src={downloadIco} alt=""/>
                </a>
                <img src={exitIco} alt="" className='player__exit' onClick={()=>setStreamAudio(null)}/>
            </div>
    );
}

const mapStateToProps=state=>({
    audio:state.Call.audio,
    streamAudioId:state.Call.streamAudioId
})

export default connect(mapStateToProps, {setStreamAudio}) (Player);