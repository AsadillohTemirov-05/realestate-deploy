import React from 'react'
import {MdOutlineQuestionAnswer} from "react-icons/md";
import {BiSelectMultiple} from "react-icons/bi";
import {GrCertificate} from "react-icons/gr";
const Features = () => {
  return (
    <section className='max-padd-container py-16 xl:py-32'>
      <div className='text-center pb-16 '>
        <h6 className='capitalize'>Few Steps to your new home</h6>
        <h2 className='h2 capitalize'>This is how easy it can be</h2>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 '>
        <div  className='bg-white p-4 rounded-3xl'>
            <MdOutlineQuestionAnswer className='bold-32 mb-3 text-secondary'/>
            <h4 className='h4'>Answer Questions</h4>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque, repellat officia iusto nostrum ipsum voluptate!</p>
        </div>
        <div  className='bg-white p-4 rounded-3xl'>
            <BiSelectMultiple className='bold-32 mb-3 text-yellow-500'/>
            <h4 className='h4'>Select Property</h4>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque, repellat officia iusto nostrum ipsum voluptate!</p>
        </div>
        <div  className='bg-white p-4 rounded-3xl'>
            <GrCertificate className='bold-32 mb-3 text-red-500'/>
            <h4 className='h4'>Enjoy living </h4>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque, repellat officia iusto nostrum ipsum voluptate!</p>
        </div>
       
      </div>
    </section>
  )
}

export default Features
