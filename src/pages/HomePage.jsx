import React from 'react'
import { useNavigate } from 'react-router-dom'
import { logoutUser } from '../api/user/authApi'
import { useSelector } from 'react-redux'


const HomePage = () => {

    const user = useSelector(state => state.userReducer)

    console.log(user)

    const navigate = useNavigate()

    const handleClick = ()=>{
        logoutUser()
    }

  return (
    <div>
        <button onClick={handleClick} className='btn btn-secondary'>Click me</button>
      <button onClick={()=>navigate("/register")} className='btn-primary btn'>Register</button>
    </div>
  )
}

export default HomePage
