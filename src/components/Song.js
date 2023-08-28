import React, { useEffect,  } from 'react'
import { motion,useAnimation } from 'framer-motion';
const Song = ({libraryStatus, currentSong, isplaying}) => {
    const control = useAnimation()
    useEffect(()=>{
        if(isplaying){
            control.start({rotate: 36000000, transition: { duration: 5000000 ,ease: "linear"}})
        }
        else{
            control.stop()
        }
    },[isplaying, control])
  return (
    <div className={`song-container ${libraryStatus && "library-active"}`}>
        <div className="song_review">
        
        <motion.div  animate = {control} className='img-container'>
        <img  src={currentSong.cover} alt={currentSong.name} />
        </motion.div>
        <div className='review'>
        </div>
        </div>
        <div className='name_artist'>
        <h2>{currentSong.name}</h2>
        <h3>{currentSong.artist}</h3>
        </div>
    </div>
  )
}

export default Song