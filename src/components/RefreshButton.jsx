import React, { useRef, useState } from 'react'
import { LuRefreshCcw, LuRefreshCw } from 'react-icons/lu'
import { useDispatch } from 'react-redux'
import { increaseRefreshToken } from '../store/features/filterSlice'
import { toast } from 'react-toastify'

const RefreshButton = () => {

    const dispatch = useDispatch()

    const lastRefreshTimeRef = useRef(0)
    const [clicked, setClicked] = useState(false)

    const handelRefresh = () =>{

        const now  = Date.now()

        if(now - lastRefreshTimeRef.current >= 2000){

            dispatch(increaseRefreshToken())
            lastRefreshTimeRef.current = now
            setClicked(true)
            setTimeout(() => {
                setClicked(false)
            }, 1000);
        }
    }

  return (
    <button className='btn btn-sm btn-ghost'
    title='Refresh'
    onClick={handelRefresh} >
      <LuRefreshCw className={`${clicked && "animate-spin"}  transition-all duration-300 delay-300 ease-in-out  text-xl` } />
    </button>
  )
}

export default RefreshButton


// todo add refresh functionally