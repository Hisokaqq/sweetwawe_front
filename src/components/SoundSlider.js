import React, {useState, useRef} from 'react'

const SoundSlider = ({audioRef}) => {
    const sliderRef = useRef(null)
    const [value, setValue] = useState(100)
    const dragHandler =  (e) => {
        audioRef.current.volume = e.target.value/100
        setValue(e.target.value)
        
    }
    
    const [color] = useState(["#EF8EA9", "#ab417f"])
  return (
    <div className='slider-cont'>
        <div className="track" style={{background:`linear-gradient(to right, ${color[0]}, ${color[1]})`}}>
            <input ref={sliderRef} className='ts' onChange={dragHandler} min="0" max="100" value={audioRef.current ? audioRef.current.volume *100 :100} type="range"/>
            <div  style={{transform: `translateX(${value ? value : 100}%)`}}  className="animate-track">
            </div>
        </div>
    </div>

  )
}

export default SoundSlider