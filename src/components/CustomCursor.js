import React, {useRef, useEffect} from 'react'
import { useLocation } from 'react-router'
const CustomCursor = () => {
    const location = useLocation().pathname
    const cursorRef = useRef(null)
    useEffect(()=>{
        document.addEventListener("mousemove", (event)=>{
            const {clientX, clientY} = event
            const mouseX = clientX - cursorRef.current.clientWidth / 2
            const mouseY = clientY - cursorRef.current.clientWidth / 2
            cursorRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;

        })
    },[])
  return (
    <div className={`app-cursor ${location !=="/" && "eee"}`} ref={cursorRef}>
    </div>
  )
}

export default CustomCursor