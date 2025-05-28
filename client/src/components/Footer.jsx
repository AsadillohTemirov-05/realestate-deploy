import React from 'react'
import { BsEnvelopeFill, BsFacebook, BsGeoAltFill, BsInstagram, BsLinkedin, BsTelephoneFill, BsTwitterX } from 'react-icons/bs'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className='max-padd-container mt-20'>
      <div className='max-padd-container bg-black text-white py-10 rounded-3xl '>
        <div className='container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8'>
            {/* logo */}
            <Link to={"/"} className="bold-24" >
                 <div className='bold-24 mb-4'>Lease <span className='text-secondary'>lodge</span></div>
                 <p className='mt-4 text-white/70'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Hic quisquam dolore id ducimus harum itaque!</p>
                 <p className='mt-4 text-white/70'>CopryRight 2024 LeaseLodge. All rights reserved</p>
                 </Link>
                 {/* Quick links */}

                 <div className=''>
                    <h4 className='h4 mb-4'>Quick Links</h4>
                    <ul className='space-y-2 regular-15'>
                        <li className='text-gray-10'><a href="/about">About Us</a></li>
                        <li className='text-gray-10'><a href="/properties">Properties</a></li>
                        <li className='text-gray-10'><a href="/services">Services</a></li>
                        <li className='text-gray-10'><a href="/contact">Contact</a></li>
                        <li className='text-gray-10'><a href="/privacy-policy">Privacy Policy </a></li>
                    </ul>
                 </div>

                 {/* Contact info */}
                 <div>
                    <h4 className='h4 mb-4'>Contact Us</h4>
                    <p className='text-gray-10 mb-2'>
                        <BsTelephoneFill className='inline-block mr-2'/>+1 (123) 456-7890
                    </p>

                    <p className='text-gray-10 mb-2'>
                        <BsEnvelopeFill className='inline-block mr-2'/> support@leaselodge.com
                    </p>

                    <p className='text-gray-10 mb-2'>
                        <BsGeoAltFill className='inline-block mr-2'/>+123 Real Estate Avenue,New York,NY
                    </p>
                 </div>


                 <div>
                    <h4   className='h4 mb-4'>Follow Us</h4>
                    <div className='flex space-x-4 text-gray-10'>
                    <a href="#" className='hover:text-blue-500'> <BsFacebook/> </a>
                    <a href="#" className='hover:text-red-500'> <BsInstagram/> </a>
                    <a href="#" className='hover:text-blue-500'> <BsTwitterX/> </a>
                    <a href="#" className='hover:text-blue-500'> <BsLinkedin/> </a>
                    </div>
                     </div>
            </div>

                 <div className='mt-10 text-center text-gray-100'>
                    <p>Powered by <a href="#">Leasodge Team</a></p>
                 </div>
        </div>
    </footer>
  )
}

export default Footer
