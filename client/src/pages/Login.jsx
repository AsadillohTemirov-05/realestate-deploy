import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import {useDispatch} from "react-redux";
import { setLogin } from '../redux/state';
const Login = () => {
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const navigate=useNavigate();
  const dispatch=useDispatch();



  const handleSubmit= async (e)=>{
    e.preventDefault();

    try {
      const response=await fetch("http://realestates:4000/auth/login",
        {method:"POST",headers:{"Content-Type":"application/json"},
        body:JSON.stringify({email,password})
      });

          const loggedIn=await response.json();

          if(loggedIn){
            dispatch(
              setLogin({
                user:loggedIn.user,
                token:loggedIn.token
              })
            )
            navigate("/");
          }

    } catch (error) {
      console.log("Login Failed:"+error.message);
    }

  }

  return (
    <div className='absolute h-full w-full bg-black/40 z-50 flexCenter'>   
     <div>
      <form onSubmit={handleSubmit}  className='flex flex-col gap-y-2.5 bg-white w-[366px] p-7 rounded-xl shadow-md text-[14px]' >
        <div className='file'>
          <h3 className='h3 my-4'>Login</h3>
        </div>
        <input  className='bg-primary border-none p-2 pl-4 rounded-md outline-none' 
        placeholder='Email Adress...'
         onChange={(e)=>setEmail(e.target.value)} 
         type="email" name="email" value={email} />



<input  className='bg-primary border-none p-2 pl-4 rounded-md outline-none' 
        placeholder='Password...' required
         onChange={(e)=>setPassword(e.target.value)} 
         type="password" name="password" value={password}
          />

          <button type='submit' className='btn-secondary rounded mt-2'>
            Login
          </button>

          <div className='text-gray-30'>
            Don't have an account? <Link to={'/register'} className='text-secondary cursor-pointer pl-1'>Register</Link>
          </div>

      </form>
     </div>
    </div>
  )
}

export default Login
