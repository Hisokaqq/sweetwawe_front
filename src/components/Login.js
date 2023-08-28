import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { containerAnim, shadowAnim } from '../animations'
import { useDispatch, useSelector } from 'react-redux'
import { login, register } from '../actions/userActions'
import Loader from './Loader'
import Message from './Message'
import MessageR from './MessageR'
const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [message, setMessage] = useState(null)
    const [logReg, setLogReg] = useState(true)
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [errormes, setErrormes] = useState(true)
    const [errormesR, setErrormesR] = useState(true)
    const userLogin = useSelector(state => state.userLogin)
    const {userInfo, loading, error} = userLogin

    
    document.body.style.overflow = "hidden"
    useEffect(()=>{
        if(userInfo){
            setErrormes(false)
            setErrormesR(false)
            document.body.style.overflowY = "auto"
            navigate("/")
        }
    },[navigate, userInfo])
    const submitHandlerLogin = (e) =>{
        e.preventDefault()
        setErrormes(false)
        dispatch(login(email, password))
        document.body.style.overflowY = "auto"
        
    }
    const submitHandlerRegister = (e) =>{
        e.preventDefault()
        setErrormesR(false)
        if(password !== confirmPassword){
            setMessage("passwords do not match")
        }else{
            document.body.style.overflowY = "auto"
            dispatch(register(name, email, password))
        }
    }
    // window.addEventListener('popstate', function(event)  {
      
    //  })

    const  exitDetailHandler = (e) => {
      const element = e.target
      
      if(element.classList.contains("shadow")){
        document.body.style.overflowY = "auto"

        navigate(`/`)
        // navigate(-1)
      }
    }
    

  return (
    <motion.div variants={shadowAnim} animate = "visible"
    initial = "hidden" className='shadow' onClick={exitDetailHandler}>
        <motion.div variants={containerAnim}
        animate = "visible"
        initial = "hidden" className="container">
            <div className='both'>
                <div className="form-inner">
                    <h2><span className={`line ${!logReg && "line-right"}`}></span> <span className={`e ${ logReg && "active-btn"}`} onClick={()=>setLogReg(true)}>Sign In </span><span  onClick={()=>setLogReg(false)} className={`e ${ !logReg && "active-btn"}`}> Sing Up</span></h2>
                   
                    <form onSubmit={submitHandlerRegister} className={`cont ${logReg && "reg  "}`}>
                    {loading && <Loader/>}
                        {message && <MessageR color={"white"} errormesR={errormesR} setErrormesR={setErrormesR}>{message}</MessageR>}
                        <div className="lr-cont">
                        <div className="form-group">
                            <label htmlFor="name">Name:</label>
                            <input required placeholder='Enter Name' type="text" name='name' id="name" value={name} onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email:</label>
                            <input required placeholder='Enter Email' type="email" name='email' id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password:</label>
                            <input required placeholder='Enter Password' type="password" name='password' id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Confirm Password:</label>
                            <input required placeholder='Confirm Password' type="password" name='password' id="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                        </div>
                        </div>
                        <button className='reg-btn' type="submit" value="REGISTER" >REGISTER <span className='weve'></span></button> 
                    </form>
                    {error && <Message color={"white"} errormes={errormes} setErrormes={setErrormes}>{error}</Message>}
                    {loading && <Loader/>}
                    <form onSubmit={submitHandlerLogin}  className={`cont ${!logReg && "log"}`}>
                        <div className='lr-cont'>
                        <div className="form-group">
                            <label htmlFor="email">Email:</label>
                            <input required placeholder='Enter Email' type="email" name='email' id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password:</label>
                            <input required placeholder='Enter Password' type="password" name='password' id="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                        </div>
                        </div>
                        
                        <button  type="submit" value="LOGIN" >Login <span className='weve'></span></button> 
                    </form>
                    
                </div>
            </div>
        </motion.div>
    </motion.div>
  )
}

export default Login