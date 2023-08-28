import React, {useState, useEffect} from 'react'
import LibrarySong from './LibrarySong'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons"
const Library = ({width, setWidth, songs,  audioRef, isplaying, libraryStatus, setLibraryStatus}) => {
  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth)
      // console.log(document.getElementsByTagName('HTML')[0].outerHTML.length)
      // console.log(window.pageYOffset)

    }
    window.addEventListener('resize', handleResize)
  },[])
  
  return (
    <div className={`library ${libraryStatus && "active-library"}`}>
        <div className='first-line'>
        <h2>Library</h2>
        {width < 1000 && <FontAwesomeIcon className='arrow' icon={faArrowLeft} onClick={()=>{setLibraryStatus(!libraryStatus)}} />}
        </div>
        
        <div className="library-songs">
            {songs.map((song, index) => <LibrarySong song={song} songs={songs} index={index}  key={song._id} audioRef={audioRef} isplaying={isplaying}  id={song._id}/> )}
        </div>
    </div>
  )
}

export default Library