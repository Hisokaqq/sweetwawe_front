import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faXmark} from "@fortawesome/free-solid-svg-icons"
const MessageR = ({color, errormesR,setErrormesR, children,}) => {
  return (
    <div style={{color: color}} className={`message-container ${errormesR && "closed"}`}>
        <p>{children}</p>
        <FontAwesomeIcon onClick={()=>setErrormesR(!errormesR)} className='x' size='2x' icon={faXmark} />
    </div>
  )
}

export default MessageR