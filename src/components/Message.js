import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faXmark} from "@fortawesome/free-solid-svg-icons"
const Message = ({color, errormes,setErrormes, children,}) => {
  return (
    <div style={{color: color}} className={`message-container ${errormes && "closed"}`}>
        <p>{children}</p>
        <FontAwesomeIcon onClick={()=>setErrormes(!errormes)} className='x' size='2x' icon={faXmark} />
    </div>
  )
}

export default Message