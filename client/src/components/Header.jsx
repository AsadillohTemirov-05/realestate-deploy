import React, { useState } from 'react'
import {FaSearch,FaUser} from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import {useDispatch,useSelector} from "react-redux";
const Header = () => {
  const [menuOpened,setmenuOpened]=useState(false);
  const[drowpdownMenu,setDropdownMenu]=useState(false);

  const user=useSelector((state)=>state.user);
  const navigate=useNavigate();
  const dispatch=useDispatch();


  const toggleMenu=()=>{
    setmenuOpened(!menuOpened);
  }
  return (

    <header className='max-padd-container flexBetween rounded-xl py-4 '>
      <Link to={"/"} className="bold-24" >
      <div>Lease <span className='text-secondary'>lodge</span></div>
      </Link>
      <div className='bg-white ring-1 ring-slate-900/5 rounded-full p-2 px-4 w-44 
      sm:w-96 flexBetween  gap-x-2  relative '> 
        <input type="text" className='outline-none border-none w-full bg-white' placeholder='Search here...' />
        <button className='absolute right-0 h-full w-10 rounded-full 
        bg-secondary text-white flexCenter cursor-pointer'><FaSearch className=''/></button>
      </div>
      {/* Dropdown Menu */}
      <div className='flexBetween gap-x-10'>
      <div onClick={()=>setDropdownMenu(!drowpdownMenu)} className='cursor-pointer relative '>
        <div>
          {!user?(<FaUser/>):(
            <img className='rounded-full object-cover aspect-square' 
            width={47} height={47} src={`http://3.6.41.162:4000/${user.profileImagePath.replace("public","")}`} alt="" srcset="" />
          )}
            </div>
            {drowpdownMenu && !user && (
              <div className='absolute  p-4 top-16  right-0 w-40 rounded-3xl bg-white text-gray-30 medium-14  flex flex-col gap-y-2 shadow-sm z-50'>
                <Link to={"/login"}>Login</Link>
                <Link to={"/register"}>Sign Up</Link>
              </div>
            )}
            {drowpdownMenu && user && (
              <div className='absolute  p-4 top-16  right-0 w-40 rounded-3xl bg-white text-gray-30 medium-14  flex flex-col gap-y-2 shadow-sm z-50'>
                <Link to={"/create-listing"}>Add Property</Link>
                <Link to={`${user._id}/trips`}>Trip List</Link>
                <Link to={`${user._id}/wishlist`}>Wish List</Link>
                <Link to={`${user._id}/listing`}>Property List</Link>
                <Link to={`${user._id}/reservation`}>Reservation List</Link>
                <Link to={"/login"} onClick={()=>{dispatch(setLogout())}}>Log Out</Link>

              </div>
            )}
      </div>  
      </div>
    </header>
  )
}

export default Header
