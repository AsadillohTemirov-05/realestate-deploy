import React from 'react'
import { Link } from 'react-router-dom'
import circle from "../assets/circle.png";
import circle1 from "../assets/person-1.jpg";
import circle2 from "../assets/person-2.jpg";
import sideImg from "../assets/sideImg.png";
import sideImg1 from "../assets/sideImg1.png";
import sideImg2 from "../assets/sideImg2.png";
import { useSelector } from 'react-redux';

const Hero = () => {
  const user=useSelector((state)=>state.user);


  return (
    <section className='max-padd-container mt-20 xl:mt-10'>
      <div className='flex flex-col xl:flex-row gap-16'>
        {/* LEft */}
        <div className='flex justify-center flex-1 flex-col gap-y-8 xl:max-w-[555px] relative  '>
            <h1 className='h1'>Invest in <span className='text-secondary'>Your Future <span>with confidence</span></span></h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem officia inventore nesciunt, animi maxime facere ipsa ex libero. Fugiat ducimus voluptas, similique veritatis eos fugit vel aspernatur deserunt rem soluta doloremque accusantium sequi nesciunt architecto, doloribus pariatur? Facilis neque asperiores aperiam, est vitae in, eum illo aut adipisci accusantium dicta quaerat at qui molestiae iusto.</p>
            <div className='flex gap-3'>
                <a href="#listing" className='btn-dark flexCenter rounded-full'>Explote Properties</a>
                
                {user?(

                  <Link className='btn-secondary flexCenter rounded-full' to={"/create-listing"}> 
                  <span className='medium-20 pr-1'>+</span> Add Property </Link>
                ): <Link className='btn-secondary flexCenter rounded-full' to={"/login"}> <span className='medium-20 pr-1'>+</span> Add Property </Link>}

            </div>
            <div className='flex relative'>
                {/* images */}
                <img src={circle} alt="" className='rounded-full h-[99px] z-30' />
                <img src={circle1}  className='shadow-sm rounded-full h-[88px] left-16 z-20' alt="" />
                <img src={circle2}  className=' shadow-sm rounded-full h-[88px] left-32 z-10'  alt="" />
            </div>
        </div>
            {/* Right */}
        <div className='flex flex-1 flex-col gap-4'>
            <div className='rounded-2xl h-[266px] overflow-hidden'>
                <img src={sideImg}  className='rounded-xl object-cover' alt="" />
            </div>
            <div className='flexBetween gap-4'>
                <div className=' flex flex-1 rounded-xl '><img  className=" rounded-xl object-cover aspect-square" src={sideImg1} alt="" /></div>
                <div className='flex flex-1 rounded-xl '><img src={sideImg2} alt=""  className=" rounded-xl object-cover aspect-square" /></div>
            </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
