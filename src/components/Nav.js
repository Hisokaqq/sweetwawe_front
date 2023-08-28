import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faMusic, faUser} from "@fortawesome/free-solid-svg-icons"
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../actions/userActions'
const Nav = ({libraryStatus, setLibraryStatus}) => {
  const userLogin = useSelector(state => state.userLogin)
  const dispatch = useDispatch()
  const logoutHander = () => {
    dispatch(logout())
  }
  const {userInfo} = userLogin
  return (
    <nav >
        <div className='main-wave'>
          <h1>SweetWave</h1>
          <h1>SweetWave</h1>
        </div>
        
        <div className="btns">
        
          <ul>
            
            <li className = {`${libraryStatus && "lbtn"}`} onClick={()=>{setLibraryStatus(!libraryStatus)}}>
              <p>Library&nbsp;
              <FontAwesomeIcon icon={faMusic}/>
              <span className="weve"></span>
              </p>
            </li>
            {userInfo ?
            <li className='prof'>
            <Link className='prof-main' to ="/profile">
            Profile&nbsp;
          <FontAwesomeIcon icon={faUser} />
          <div className="weve"></div>
            </Link>
            <Link onClick={logoutHander} className='logout' to ="/">
            LogOut
          <div className="weve"></div>
            </Link>
          </li>
          :
            <li>
              <Link to ="/login">
              Log in/Log out&nbsp;
            <FontAwesomeIcon icon={faUser} />
            <div className="weve"></div>
              </Link>
            </li>
            }
          </ul>
        
        </div>
        
    </nav>
  )
}

export default Nav