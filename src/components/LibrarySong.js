import React  from 'react'
import { useSelector, useDispatch} from "react-redux"
import { listSongDetails } from '../actions/songActions'
const LibrarySong = ({song,songs, audioRef, isplaying, id, index}) => {
    const dispatch = useDispatch()
    const songDetails = useSelector(state => state.songDetails)
    let {currentSong} = songDetails
    const fetchSong =  async (idd) => {
          await dispatch(listSongDetails(idd))
    }

    const songSelectHandler = () => {
        const currentSonge = songs.find(state=>state._id ===song._id)
        currentSong = (currentSonge)
        fetchSong(currentSong._id)
        if(isplaying){
            const playPromise = audioRef.current.play()
            if(playPromise !==undefined){
                playPromise.then((audio) => {
                    audioRef.current.play()
                })
            }
        }
    }
  return (
    <div className={`library-song ${index+1 == currentSong._id ? "selected" : "l"}`} onClick={songSelectHandler}>
        <img src={song.cover} alt={song.name} />
        <div className="song-description"><h3>{song.name}</h3>
        <h4>{song.artist}</h4></div>
    </div>
  )
}

export default LibrarySong