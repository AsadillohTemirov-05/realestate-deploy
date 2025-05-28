import React, { useEffect, useState } from 'react'
import { Form, Link, useNavigate } from 'react-router-dom'
import {MdUpload} from "react-icons/md";
const Register = () => {
  const navigate=useNavigate();

  const[passwordMatch,setpasswordMatch]=useState(true);
  const [formData,setFormData]=useState({firstName:"",lastName:"",email:"",password:"",confirmPassword:"",profileImage:null});

  console.log(formData);

  const handleChange=(e)=>{
    const {name,value,files}=e.target;
    setFormData({
      ...formData,[name]:value  ,
      [name]:name==="profileImage"?files[0]:value
    })


  }


  const handleSubmit=async (e)=>{
    e.preventDefault();
    try{
      const register_form=new FormData();

      for(var key in formData){
        register_form.append(key,formData[key]);

      }
      const response=await fetch("http://realestates:4000/auth/register",
        {method:"POST",body:register_form});

      if(response.ok){
      navigate("/login")
      }
    
    }
    catch(err){
      console.log("Reegistration failed:"+err);

    }
  }

  useEffect(()=>{
    setpasswordMatch(
      formData.password===formData.confirmPassword||formData.confirmPassword===""
    )
  },[formData.password,formData.confirmPassword]);

  return (
    <div className='absolute h-full w-full bg-black/40 z-50 flexCenter'>
      <div >
        <form onSubmit={handleSubmit} className='flex flex-col gap-y-2  bg-white w-[366px] p-7 rounded-xl shadow-md text-[14px]'>
          <div className=''>
            <h4 className='h3 my-6'>Sign Up</h4>
          </div>

          <input type="text"
           name='firstName'
           onChange={handleChange}
           value={formData.firstName}
            placeholder='First Name...'
             required  className='bg-primary border-none p-2 pl-4 rounded-md  outline-none' />
        
          <input type="text" 
          name='lastName'
          value={formData.lastName}
          onChange={handleChange}
           placeholder='Last Name'  required className='bg-primary border-none p-2 pl-4 rounded-md  outline-none'  />

           <input 
           type="email"
           value={formData.email}
           onChange={handleChange}
            name='email' placeholder='Email Adress' className='bg-primary border-none p-2 pl-4 rounded-md  outline-none' required />

          <input  onChange={handleChange} value={formData.password}  className='bg-primary border-none p-2 pl-4 rounded-md  outline-none' type="password" name='password' placeholder='Password...' required />
          <input onChange={handleChange}  value={formData.confirmPassword} type="text" 
          name='confirmPassword' placeholder='Confirm Password...' className='bg-primary border-none p-2 pl-4 rounded-md  outline-none'  required/>
        {!passwordMatch && <p>Password do not match!</p> }
          <input onChange={handleChange} type="file" name="profileImage" id="image" hidden required />

          <label htmlFor="image">
            <div className='flexCenter ring-1 ring-slate-900/10 p-1 h-16 w-16 rounded'> 
            
            {formData.profileImage?(
                <img src={URL.createObjectURL(formData.profileImage)} alt="" className='p-1 h-16 object-contain aspect-square' />
              ):(<MdUpload className='text-tertiary text-3xl' /> )
            }
             
            </div>
          </label>
          <button type='submit' className='btn-secondary rounded my-2'>Register</button>

          <div className='text-gray-30'>Already have an account? <Link to={'/login'}>Login</Link></div>
        </form>
      </div>
    </div>
  )
}

export default Register
