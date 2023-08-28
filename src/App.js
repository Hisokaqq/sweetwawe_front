import { useState, useRef, useEffect } from "react";
import Song from "./components/Song";
import Player from "./components/Player";
import "./styles/app.scss"
import { useSelector, useDispatch} from "react-redux"
import { listSongs, listSongDetails } from "./actions/songActions";
import Library from "./components/Library";
import Nav from "./components/Nav";
import Loader from "./components/Loader";
import Message from "./components/Message";
import Background from "./components/Background";
import Profile from "./components/Profile";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Login from "./components/Login";
import SoundSlider from "./components/SoundSlider";
import CustomCursor from "./components/CustomCursor";
function App() {
  const [errormes, setErrormes] = useState(false)
  const dispatch = useDispatch()
  const [width, setWidth] = useState(window.innerWidth)
  // const [songs, setSongs] = useState(
  //   [{_id: 3}]
  // )
  const songList = useSelector(state=>state.songList)
  let {error, loading, songs} = songList
  const songDetails = useSelector(state => state.songDetails)
  let {currentSong} = songDetails
  useEffect(()=>{
    const fetchSongs =  async () => {
      await dispatch(listSongs())
      await dispatch(listSongDetails(1))
    }
    fetchSongs()
  },[dispatch, ])

  
  const [isplaying, setIsplaying] = useState(false)
  const [libraryStatus, setLibraryStatus ] = useState(false)
  const audioRef = useRef(null)

  return (
    <BrowserRouter className={`App ${libraryStatus && "library-active"}`}>
      
      <CustomCursor />
      <Background/>
      
      <SoundSlider audioRef={audioRef}/>
      <Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus}/>
      {loading ? <Loader/>
      : error ? <Message color={"black"} errormes={errormes} setErrormes={setErrormes}>{error}</Message> : 
      
    <>
      <Song libraryStatus={libraryStatus} isplaying={isplaying} currentSong={currentSong}/>
      <Player libraryStatus={libraryStatus} currentSong={currentSong} isplaying={isplaying} setIsplaying={setIsplaying} audioRef={audioRef} songs={songs} />
    <Routes>
      <Route path="/login" element={<Login />}/>
      <Route path="/profile" element={<Profile />}/>
      <Route path="/" element={<Library width={width} setWidth={setWidth} setLibraryStatus={setLibraryStatus} libraryStatus={libraryStatus}  songs={songs} audioRef={audioRef} isplaying={isplaying} />}/>
    </Routes>
    </>
    }

    </BrowserRouter>
  );
}

export default App;
 