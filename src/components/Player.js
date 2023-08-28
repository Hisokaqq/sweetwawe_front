import React, { useState, useEffect} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faPlay, faAngleLeft, faAngleRight, faPause, faHeart, faRepeat} from "@fortawesome/free-solid-svg-icons"
import { useSelector, useDispatch} from "react-redux"
import { listSongDetails,  } from '../actions/songActions'
import { getUserDetails } from '../actions/userActions'
import { useNavigate } from 'react-router'
import { addLike } from '../actions/songActions'
const Player = ({libraryStatus, isplaying, setIsplaying, audioRef, songs, }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const songDetails = useSelector(state => state.songDetails)
    let {currentSong} = songDetails
    let userDetails = useSelector(state => state.userDetails)
    let {user} = userDetails
    let likes = user &&  user.like
    
    const fetchSong =  async (idd) => {
          await dispatch(listSongDetails(idd))
          await dispatch(getUserDetails("profile")) 
    }
    useEffect(()=>{
        const eq = async () => {
            await dispatch(getUserDetails("profile")) 
        }
        eq()
    },[dispatch, navigate])

    const [color] = useState(["#EF8EA9", "#ab417f"])
    const [onRepeat, setOnRepeat] = useState(false)
    const playSongHandler = () =>{
        if(isplaying){
            audioRef.current.pause()
            setIsplaying(!isplaying) 
        }
        else{
            audioRef.current.play()
            setIsplaying(!isplaying) 
        }
    }
    const [songInfo, setSonfInfo] = useState({
        currentTime: null,
        duration: null,
        animationPercentage: 0,
    })
    const timeUpdateHandler = (e) => {
        const current = e.target.currentTime
        const duration = e.target.duration
        const roundedCurrent = Math.round(current)
        const roundedDuration = Math.round(duration)
        const animationPercentage = Math.round(roundedCurrent/roundedDuration * 100)
        setSonfInfo({...songInfo, currentTime:current, duration:duration, animationPercentage})
    }
    const getTime = (time) =>{
            return Math.floor(time / 60) + ":" + ("0" + Math.floor(time%60)).slice(-2)
        
    }
    const dragHandler = (e) => {
        setSonfInfo({...songInfo, currentTime: e.target.value})
        audioRef.current.currentTime = e.target.value
    }
        
        
    const skipTrackHandler = (direction) => {
        let currentIndex = songs.findIndex((song)=>song._id === currentSong._id)
        if(direction ==="skip-forward"){
            fetchSong((songs[(currentIndex+1)%songs.length])._id)
        }
        if(direction ==="skip-back"){
            if((currentIndex-1)%songs.length ===-1){
                currentIndex = songs.length
            }
            fetchSong(songs[(currentIndex-1)%songs.length]._id)
        }
    }
    const trackAnim = {
        transform: `translateX(${songInfo.animationPercentage}%)`,
    }
    const likeHandler = async () => {
        await dispatch(addLike(currentSong._id))
        await dispatch(getUserDetails("profile"))
    }
    if(isplaying){
        const playPromise = audioRef.current.play()
        if(playPromise !==undefined){
            playPromise.then((audio) => {
                audioRef.current.play()
            })
        }
    }
    
    const onRepeatHandler = () => {
        setOnRepeat(!onRepeat)
    }
    useEffect(()=>{
        
        
        const songEndHandler = async () => {
            if(onRepeat) return 
            let currentIndex = await songs.findIndex((song)=>song._id === currentSong._id)
            await fetchSong(songs[(currentIndex+1)%songs.length]._id)
            const playPromise = await audioRef.current.play()
            if(playPromise !==undefined ){
                playPromise.then((audio) => {
                    audioRef.current.play()
                })
            }
        }
        if (-(songInfo.currentTime) + (songInfo.duration) < 0.0138 && songInfo.duration !==0 && songInfo.duration!==null){
            songEndHandler()
        }
    }, [songInfo.currentTime])
  return (
    <>
        <div className={`player ${libraryStatus && "library-active"}`}>
        <div className='time-control'>
            <p>{getTime(songInfo.currentTime)}</p>
            <div className="track" style={{background:`linear-gradient(to right, ${color[0]}, ${color[1]})`}}>
            <input className='ts' onChange={dragHandler} min={0} max={songInfo.duration ? songInfo.duration : ""} value={songInfo.currentTime ? songInfo.currentTime : 0} type="range"/>
            <div style={trackAnim} className="animate-track">
            </div>
            </div>
            <p> {`${songInfo.duration ? getTime(songInfo.duration) : ""}`}</p>
        </div>
        <div className="play-control">
            <FontAwesomeIcon onClick={onRepeatHandler} icon={faRepeat} size="2x" className={`repeat ${onRepeat && "repeat-anim"}`}/>
            <FontAwesomeIcon onClick={()=>skipTrackHandler("skip-back")} className='skip-back contr-btn' size='2x' icon={faAngleLeft} />
            <FontAwesomeIcon onClick={playSongHandler} className='play contr-btn' size='2x' icon={isplaying ? faPause : faPlay} />
            <FontAwesomeIcon onClick={()=>skipTrackHandler("skip-forward")} className='skip-forward contr-btn' size='2x' icon={faAngleRight} />
            {likes ? 
             <FontAwesomeIcon size='2x' icon={ faHeart} onClick={likeHandler}  className={`heart ${likes.find(state => state.song == currentSong._id) && "heart-anim" } `}/>
             :
             <FontAwesomeIcon onClick={() => navigate("/login")} size='2x' icon={ faHeart} className={`heart  `}/>
        }
            
        </div>
        <audio onLoadedMetadata={timeUpdateHandler} onTimeUpdate={timeUpdateHandler} ref={audioRef} src={currentSong.audio} ></audio>
    </div>
    </>
  )
}

export default Player