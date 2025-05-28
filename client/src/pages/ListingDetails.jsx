import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Loader from '../components/Loader';
import Header from '../components/Header';
import Footer from "../components/Footer";
import { HiOutlineLocationMarker } from 'react-icons/hi';
import { FaPersonShelter } from 'react-icons/fa6';
import { MdBed,  MdOutlineBedroomChild, MdOutlineBathroom } from "react-icons/md";
import {facilities} from "../assets/data";
import {DateRange} from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { useSelector } from 'react-redux';


const ListingDetails = () => {
    const [loading,setLoading]=useState(true);
    const {listingId}=useParams();
    const [listing,setListing]=useState(null);
    const navigate=useNavigate();




    const getListingDetails=async ()=>{
        try {
            const response=await fetch(`http://3.6.41.162:4000/listing/${listingId}`,{
                method:"GET",
            });
            const data=await response.json();
            setListing(data);
            setLoading(false);

        } catch (error) {
         console.log("Fetch Listing Details Failed",error);

        }
    };



    const [dateRange,setDateRange]=useState([
        {startDate:new Date(), endDate:new Date(),key:"selection"},
    ]);

    const handleSelect=(ranges)=>{
        setDateRange([ranges.selection]);

    };


    const start=new Date(dateRange[0].startDate);
    const end=new Date(dateRange[0].endDate);
    const dayCount=Math.round(end-start)/(1000*60*60*24);

    const customerId=useSelector((state)=>state?.user?._id);

    const isOwner=listing?.creator?._id==customerId;


    const handleSubmit=async()=>{

      try {
      const bookingForm={
        customerId,listingId,hostId:listing.creator._id,
        startDate:dateRange[0].startDate.toDateString(),
        endDate:dateRange[0].endDate.toDateString(),
        totalPrice:listing.price*dayCount,
        title:listing.title,
        description:listing.description,

      };

      const response=await fetch("http://3.6.41.162:4000/bookings/create",{
        method:"POST",
        headers:{
          "Content-Type":"application/json",
        },
        body:JSON.stringify(bookingForm)
      });

      if(response.ok){
        navigate(`/${customerId}/trips`);

      }
        
      } catch (error) {
        console.log("Submit Booking failed:",error);
      }
      
     
    }

    useEffect(()=>{
        getListingDetails();
    },[]);


  return loading ?(<Loader/>):(
    <>
    <Header/>
    <section className="max-padd-container flex gap-12 flex-col-reverse xl:flex-row py-10">
  <div className="flex-1 ">
    <div>
      <h3 className="text-3xl font-semibold">{listing.title}</h3>
      <div className="flex items-center text-gray-600 text-sm mt-1 gap-1">
        <span><HiOutlineLocationMarker /> </span>
      <p>{listing.type} in 
        {listing.city}, {listing.province}, {listing.country}</p> 
      </div>

      <div className="flex gap-6 flex-wrap text-sm text-gray-800 pt-2">
      <div className="flex items-center gap-2">
        <FaPersonShelter className="text-xl" />
        <span>{listing.guestCount} Guests</span>
      </div>
      <div className="flex items-center gap-2">
        <MdOutlineBedroomChild className="text-xl" />
        <span>{listing.bedroomCount} Bedrooms</span>
      </div>
      <div className="flex items-center gap-2">
        <MdBed className="text-xl" />
        <span>{listing.bedCount} Beds</span>
      </div>
      <div className="flex items-center gap-2">
        <MdOutlineBathroom className="text-xl" />
        <span>{listing.bathroomCount} Bathrooms</span>
      </div>
    </div>
    </div>

 
    

    <div className="flex items-center gap-3 pt-4">
      <img
        src={`http://3.6.41.162:4000/${listing?.creator?.profileImagePath?.replace("public", "")}`}
        alt="creator"
        className="w-11 h-11 rounded-full object-cover"
      />
      <h5 className="text-sm text-gray-800">Hosted by {listing.creator.firstName} {listing.creator.lastName}</h5>
    </div>

    <p className="text-gray-700">{listing.description}</p>

    <div>
      <h4 className="text-xl font-semibold mb-3">What this place offers?</h4>
      <ul className="flex flex-wrap gap-4">
        {listing.amenities[0].split(",").map((item, i) => (
          <li key={i} className="flex items-center gap-3 bg-white border shadow-sm px-4 py-2 rounded-md">
            <div>{facilities.find(f => f.name === item)?.icon}</div>
            <p className="text-sm">{item}</p>
          </li>
        ))}
      </ul>
    </div>
  </div>

  {/* Right Side - Booking Calendar */}
  <div className="w-full xl:w-[400px] border p-5 rounded-lg shadow-sm mt-20">  
    <h4 className="text-xl font-semibold mb-4">How long do you want to stay?</h4>
    <DateRange ranges={dateRange} onChange={handleSelect} />
    <div className="pt-6 space-y-3">
      <div className="flex justify-between text-sm text-gray-800">
        <span>Total Stay:</span>
        <span>${listing.price} × {dayCount} night{dayCount > 1 ? "s" : ""}</span>
      </div>
      <div className="flex justify-between font-medium">
        <span>Total Price:</span>
        <span>${listing.price * dayCount}</span>
      </div>
      <div className="flex justify-between text-sm text-gray-600 pt-2">
        <span>Start Date:</span>
        <span>{dateRange[0].startDate.toDateString()}</span>
      </div>
      <div className="flex justify-between text-sm text-gray-600">
        <span>End Date:</span>
        <span>{dateRange[0].endDate.toDateString()}</span>
      </div>
    </div>
    <button onClick={handleSubmit} disabled={isOwner}  className="
    btn-secondary rounded-full flexCenter gap-x-2 capitalize">
      {isOwner?"You can't book your own property":"Book the Visit"}
    </button>
  </div>


  <div className='flex-1'>
        <div className='flex flex-wrap'>
          {listing.listingPhotoPaths?.map((item,index)=>(
            <div key={index} className={`${index===0} ? "w-full":"w-1/2" p-2`}>
              <img className={`max-w-full ${index===0?"object-contain rounded-3xl":"rounded-2xl"}`}   src={`http://3.6.41.162:4000/${item.replace("public","")}`} alt="" />
            </div>
          ))}

        </div>
  </div>

</section>
<Footer/>
    </>
  )
}

export default ListingDetails
