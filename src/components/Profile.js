import React , { useState, useEffect }from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { containerAnim, shadowAnim } from '../animations'
import { useDispatch, useSelector } from 'react-redux'
import { getUserDetails, updateUserProfile} from '../actions/userActions'
import Loader from './Loader'
import MessageR from './MessageR'
import { USER_PROFILE_UPDATE_RESET } from '../constants/userConstants'
import axios from "axios"
const Profile = () => {
  const [errormesR, setErrormesR] = useState(true)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [message, setMessage] = useState(null)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const userDetails = useSelector(state => state.userDetails)
  const {user, loading} = userDetails
  const userLogin = useSelector(state => state.userLogin)
  const {userInfo} = userLogin
  const userUpdateProfile = useSelector(state => state.userUpdateProfile)
  const {success} = userUpdateProfile
  // console.log(user.avatar[0].avatar)
    document.body.style.overflow = "hidden"
    useEffect(()=>{
      if(!userInfo){
        document.body.style.overflowY = "auto"
        navigate(`/`)
      }else{
        if(!user || !user.name || success){
          dispatch({type:USER_PROFILE_UPDATE_RESET})
          dispatch(getUserDetails("profile"))
        }else{
          setName(user.name)
          setEmail(user.email)
        }
      }
    },[dispatch,navigate,userInfo, user, success])
    window.addEventListener('popstate', function(event)  {
      // document.body.style.overflow = "auto"
      
     })

    const  exitDetailHandler = (e) => {
      const element = e.target
      
      if(element.classList.contains("pshadow")){
        document.body.style.overflowY = "auto"

        navigate(`/`)
        // navigate(-1)
      }
    }
    const submitHandlerRegister = (e) =>{
      e.preventDefault()
      setErrormesR(false)
      if(password !== confirmPassword){
          password !== "" &&setMessage("passwords do not match")
      }else{
          document.body.style.overflowY = "auto"
          dispatch(updateUserProfile({"id":user._id, "name": name, "email": email, "password":password}))
      }
  }
  const imgHandler = async (e) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append("avatar", file)

    try{
      const config = {
        headers: {
            'Content-type': 'multipart/form-data',
            Authorization: `Bearer ${userInfo.token}`
        }
    }
    console.log(file)

    const {
        data
    } = await axios.post(
        `/api/users/profile/avatar/`,
        {"avatar": file},
        config
    )
    dispatch(getUserDetails("profile"))
      
    }catch(error){
      console.log("error")
    }
  }
  return (
    <motion.div variants={shadowAnim} animate = "visible"
    initial = "hidden" className='pshadow' onClick={exitDetailHandler}>
        {loading&&loading}
        <motion.div variants={containerAnim}
        animate = "visible"
        initial = "hidden" className="pcontainer">
          <div className="img-cont">
          <img  className='prof-pic' src={`/images/${user.avatar}`} alt="default" />
          <input accept="image/*" onChange={imgHandler} type="file" id="fileinput" name="fileinput" />
          <p>Upload Photo</p>
          </div>
           <form onSubmit={submitHandlerRegister} className={`cont`}>
                    {loading && <Loader/>}
                        {message && <MessageR color={"white"} errormesR={errormesR} setErrormesR={setErrormesR}>{message}</MessageR>}
                        <div className="lr-cont">
                        <div className="form-group">
                            <label htmlFor="name">Name:</label>
                            <input  placeholder='Enter Name' type="text" name='name' id="name" value={name} onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email:</label>
                            <input  placeholder='Enter Email' type="email" name='email' id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password:</label>
                            <input  placeholder='Enter Password' type="password" name='password' id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Confirm Password:</label>
                            <input  placeholder='Confirm Password' type="password" name='password' id="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                        </div>
                        </div>
                        <button className='reg-btn' type="submit" value="REGISTER" >UPDATE <span className='weve'></span></button> 
                    </form>
        </motion.div>
    </motion.div>
  )
}

export default Profile