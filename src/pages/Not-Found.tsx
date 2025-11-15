import React from 'react'
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <div>
        <img src={"/not-found.svg"} width={600} height={600} alt={"404"} />
      </div>
      <Link to={'/'}>
        <button 
        className="btn btn-sm mt-4 bg-amber-300 hover:bg-amber-400 rounded-lg shadow border-base-content/50 text-black"
        >Home</button>
      </Link>
    </div>
  );
}

export default NotFound
