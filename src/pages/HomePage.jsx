import React from 'react'
import { useNavigate } from 'react-router-dom'
import { logoutUser } from '../api/user/authApi'
import { useSelector } from 'react-redux'


const HomePage = () => {

    const user = useSelector(state => state.user)

    console.log(user)

    const navigate = useNavigate()

    const handleClick = async()=>{
       const res = await logoutUser()
       console.log(res)
    }

  return (
    <div>
        <button onClick={handleClick} className='btn btn-secondary'>Click me</button>
      <button onClick={()=>navigate("/register")} className='btn-primary btn'>Register</button>
    </div>
  )
}

export default HomePage
