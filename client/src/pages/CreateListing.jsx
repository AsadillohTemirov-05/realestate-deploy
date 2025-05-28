import React, { useState } from 'react'
import { categories,facilities,types } from '../assets/data';
import {DragDropContext,Draggable,Droppable} from "react-beautiful-dnd";
import { BiTrash } from 'react-icons/bi';
import {IoIosImages} from "react-icons/io";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaMinus,FaPlus } from 'react-icons/fa6';
import Header from "../components/Header";

const CreateListing = () => {
  const navigate=useNavigate();
  const [category,setCategory]=useState("");
  const [type,setType]=useState("");
  const [amenities,setAmenties]=useState([]);
  const [photos,setPhotos]=useState([]);


  const [guestCount,setguestCount]=useState(1);
  const [bedroomCount,setBedroomCount]=useState(1);
  const [bedCount,setBedCount]=useState(1);
  const [bathroomCount,setBathroomCount]=useState(1);
  const creatorId=useSelector((state)=>state.user._id);

  const [formLocation,setFormLocation]=useState({
    streetAdress:"",aptSuite:"",
    city:"", province:"",country:"",
});


  const [formDescription,setFormDescription]=useState({
    title:"",description:"", price:0,
  });



  const handleChangeLocation=(e)=>{
    const {name,value}=e.target;
    setFormLocation({
      ...formLocation,
      [name]:value,
    })
  };

const handleChangeDescription=(e)=>{
  const {name,value}=e.target;
  setFormDescription({
    ...formDescription,[name]:value
  })
};

  
  const handleSelectAmenities = (facility) => {
    setAmenties((prevAmenities) =>
      prevAmenities.includes(facility)
        ? prevAmenities.filter((option) => option !== facility)
        : [...prevAmenities, facility]
    );
  };
  


  const handleDragPhoto=(result)=>{
    if(!result.destination) return;
    const items=Array.from(photos);
    const [reorderedItem]=items.splice(result.source.index,1);
    items.splice(result.destination.index,0,reorderedItem);
    setPhotos(items);

  };


  const handleUploadPhotos=(e)=>{
    const newPhotos=e.target.files;
    setPhotos((prevPhotos)=>[...prevPhotos,...newPhotos]);


  }
  const handleRemovePhoto=(indexToRemove)=>{
    setPhotos((prevPhotos)=>
    prevPhotos.filter((_,index)=>index!==indexToRemove)
    )
  };


  const handlePost = async (e) => {
    e.preventDefault();
    try {
      const listingForm=new FormData();
      listingForm.append("creator",creatorId);
      listingForm.append("category",category);
      listingForm.append("type",type);
      listingForm.append("streetAdress",formLocation.streetAdress);
      listingForm.append("aptSuite",formLocation.aptSuite);
      listingForm.append("city",formLocation.city);
      listingForm.append("province",formLocation.province);
      listingForm.append("country",formLocation.country);
      listingForm.append("guestCount",guestCount);
      listingForm.append("bedroomCount",bedroomCount);
      listingForm.append("bedCount",bedCount);
      listingForm.append("bathroomCount",bathroomCount);
      listingForm.append("amenities",amenities);
      listingForm.append("title",formDescription.title);
      listingForm.append("description",formDescription.description);
      listingForm.append("price",formDescription.price);
      photos.forEach((photo)=>{
        listingForm.append("listingPhotos",photo);
      });

      const response=await fetch("http://realestates:4000/listing/create",
        {
          method:"POST",
          body:listingForm,
        });
        if(response.ok){
          navigate("/");
        }
        
    } catch (error) {
      console.log("Publish listing error:",error);
      
    }
  };
  


  return (
    <>
    
      <Header/>
      <section className='max-padd-container py-10'>
      <h3 className='h3'>Add Property</h3>
      <form onSubmit={handlePost}>
      <h4 className='h4 my-4 '>Describe Your property</h4>
      <div className="hide-scrollbar flex gap-x-1 ring-1 bg-white 
      ring-slate-400/5 shadow-sm rounded-full px-2 py-3 overflow-x-auto mb-16">
      {categories.map((item) => (
      <div onClick={()=>setCategory(item.label)} className="flexCenter gap-2 p-2 flex-col
      cursor-pointer min-w-24 xl:min-w-32"
      style={{ flexShrink: 0 }} key={item.label}>
      <div className="text-secondary rounded-full h-10 w-10 p-2 flexCenter text-lg"
      style={{ backgroundColor: item.color }}>
      {item.icon}
      </div>
      <p  className={`${category==item.label?'text-secondary':""} medium-14`}>{item.label}</p>
      </div>
      ))}
      </div>
      {/* Container Types Locations */}
      <div className='flex-col flex xl:flex-row gap-x-16'>
      <div className='flex-1'>
      <h4 className='h4 my-4'>What is the type of your place?</h4>
       <div className='flex flex-col gap-y-3 mb-6'>
      {types.map((item)=>(
      <div   className={`${type===item.name?"ring-1 ring-slate-900/50":
      "ring-1 ring-slate-900/5"}
      flexBetween max-w-[777px] rounded-xl px-4 py-1`} key={item.name} 
      onClick={()=>setType(item.name)}>
      <div>
      <h5 className='h5'>{item.name}</h5>
      <p>{item.description}</p>
      </div>
      <div className='text-2xl'>{item.icon}</div>
      </div>
      ))}
      </div>
      </div>
      <div className='flex-1 mb-4 '>
      <h4 className='h4 mb-4 '>What is the adress of your place?</h4>
      <div>
      <h5 className='h5'>Street Adresss:</h5>
      <input  onChange={handleChangeLocation} value={formLocation.streetAdress} className='bg-white ring-1 ring-slate-900/5 p-2 text-sm outline-none border-none mb-2 rounded'  type="text" name='streetAdress' placeholder='Street' required />
      </div>

      <div className='flex gap-6'>
      <div className='w-1/2'>
      <h5  className='h5'>Apartment,Suite (opt):</h5>
      <input  onChange={handleChangeLocation} value={formLocation.aptSuite} className='bg-white  ring-1 ring-slate-900/5 p-2 text-sm outline-none border-none mb-2 rounded ' required type="text"  name='aptSuite' placeholder='Apt,Suite (opt)'/>
      </div>
      <div className='w-1/2'>
      <h5 className='h5'>City:</h5>
      <input onChange={handleChangeLocation} value={formLocation.city} className='bg-white  ring-1 ring-slate-900/5 p-2 text-sm outline-none border-none mb-2 rounded '
      required type="text"  name='city' placeholder='City'/>
      </div>
      </div>
      <div className='flex gap-6'>
      <div className='w-1/2'>
      <h5  className='h5'>Province:</h5>
      <input onChange={handleChangeLocation} value={formLocation.province} className='bg-white text-sm p-2 ring-1 ring-slate-900/5
      outline-none border-none mb-2 rounded ' required type="text"
      name='province' placeholder='Province'/>
      </div>

      <div className='w-1/2'>
      <h5 className='h5'>Country:</h5>
      <input onChange={handleChangeLocation} value={formLocation.country} 
       className='ring-1 ring-slate-900/5 p-2 bg-white text-sm outline-none 
       border-none mb-2 rounded '
      required type="text"  name='country' placeholder='Country'/>
      </div>
      </div>
      </div>
      </div>

      <h4 className='h4 my-4'>Provide some essential details about your place?</h4>
      <div className='flex flex-wrap gap-4 mb-6'>
      <div className='flexCenter gap-x-4 ring-1 ring-slate-900/5 p-2 rounded'>
      <h5>Guests</h5>
      <div className='flexCenter  gap-x-2  bg-white'>
      <FaMinus onClick={()=>{
      guestCount > 1 && setguestCount(guestCount-1);}}
       className="h-6 w-6 text-xl p-1 rounded cursor-pointer" />
      <p>{guestCount}</p>
      <FaPlus className='h-6 w-6 text-xl p-1 bg-secondary text-white rounded cursor-pointer' onClick={()=>{setguestCount(guestCount+1)}}  />
      </div>
      </div>

      <div className='flexCenter gap-x-4 ring-1 ring-slate-900/5 p-2 rounded'>
      <h5>Bedrooms</h5>
      <div className='flexCenter  gap-x-2  bg-white'>
      <FaMinus onClick={()=>{
      bedroomCount > 1 && setBedroomCount(bedroomCount-1);
      }} className="h-6 w-6 text-xl p-1 rounded cursor-pointer" />
      <p>{bedroomCount}</p>
      <FaPlus className='h-6 w-6 text-xl p-1 bg-secondary 
      text-white rounded cursor-pointer' 
      onClick={()=>{setBedroomCount(bedroomCount+1)}}  />
      </div>
      </div>

      <div className='flexCenter gap-x-4 ring-1 ring-slate-900/5 p-2 rounded'>
      <h5>Bed</h5>
      <div className='flexCenter  gap-x-2  bg-white'>
      <FaMinus onClick={()=>{
      bedCount > 1 && setBedCount(bedCount-1);
      }} className="h-6 w-6 text-xl p-1 rounded cursor-pointer" />
      <p>{bedCount}</p>
      <FaPlus className='h-6 w-6 text-xl
      p-1 bg-secondary text-white rounded cursor-pointer'
      onClick={()=>{setBedCount(bedCount+1)}}  />
                  </div>
                </div>

                <div className='flexCenter gap-x-4 ring-1 ring-slate-900/5 p-2 rounded'>
                  <h5>Bathrooms</h5>
                  <div className='flexCenter  gap-x-2  bg-white'>
                    <FaMinus onClick={()=>{
                      bathroomCount > 1 && setBathroomCount(bathroomCount-1);
                    }} className="h-6 w-6 text-xl p-1 rounded cursor-pointer" />
                    <p>{bathroomCount}</p>
                    <FaPlus className='h-6 w-6 text-xl p-1 bg-secondary 
                    text-white rounded cursor-pointer' 
                    onClick={()=>{setBathroomCount(bathroomCount+1)}}  />
                  </div>
                </div>
               </div>

               <div className='my-10'>
                <h4 className='h4 my-4 '>Describe the feature of your location?</h4>
                <ul className='flex items-center flex-wrap gap-3 mb-10'>
  {facilities.map((card) => (
    <li
      key={card.name}
      onClick={() => handleSelectAmenities(card.name)}
      className={`${
        amenities.includes(card.name)
          ? 'ring-1 ring-slate-900/50'
          : 'ring-1 ring-slate-900/5'
      } flex items-center gap-3 bg-white p-4 rounded cursor-pointer transition`}
    >
      <div>{card.icon}</div>
      <p>{card.name}</p>
    </li>
  ))}
</ul>

                <h4 className='h-4 my-6'>Include images showcasing your property?</h4>

                  <DragDropContext onDragEnd={handleDragPhoto} >
                  <Droppable droppableId="photos" direction="horizontal" >
                  {(provided)=>(
                   <div className='grid
                  grid-cols-2 sm:grid-cols-3 
                  md:grid-cols-4  lg:grid-cols-5 xl:grid-cols-6 gap-4
                  p-4 bg-gray-50 rounded-lg shadow-lg' {...provided.droppableProps} ref={provided.innerRef} >
                  {photos.length<1 && (
                   <>
                   <input type="file" name="image" accept='image/*' 
                  onChange={handleUploadPhotos} multiple id='imageUpload' className='hidden' />
                  <label htmlFor="imageUpload" className='group  flex flex-col items-center justify-center border-2 border-dashed  border-gray-300 rounded-lg p-6 hover:bg-gray-100
                  transition-colors'>
                   <div className='h-52 w-full flexCenter'>
                   <IoIosImages className='text-6xl  text-gray-400 group-hover:text-gray-600'/>
                   </div>
                  <p className='text-gray-500 group-hover:text-gray-700'>Upload  from your device </p>
                  </label>
                  </>
                  )}
                  {photos.length>=1 && (
                  <>
                  {photos.map((photo,index)=>{
                   return (
                  <Draggable draggableId={index.toString()} index={index}  key={index}>
                  {(provided)=>(
                  <div ref={provided.innerRef} {...provided.dragHandleProps} className='relative group' >
                  <img src={URL.createObjectURL(photo)} alt="property"  className='aspect-square object-cover h-52 w-full rounded-lg  shadow-md ' />
                   <button type='button' className='absolute top-2 right-2 bg-white p-1 rounded-full shadow-md  hover:bg-gray-200'
                  onClick={()=>handleRemovePhoto(index)}>
                  <BiTrash className='text-red-600'/>
                  </button>
                  </div>
                                        )}
                  </Draggable>
                    )})}
                    <input type="file" id='imageUpload' accept='image/*'
                     onChange={handleUploadPhotos} multiple className='hidden'  />
                     <label htmlFor="imageUpload" className='group flexCenter flex-col border-2 border-dashed  border-gray-300 rounded-lg p-6 hover:bg-gray-100 transition-colors cursor-pointer' >
                     <div className='h-40 w-full flexCenter'>
                   <IoIosImages className='text-6xl  text-gray-400 group-hover:text-gray-600'/>
                   </div>
                  <p className='text-gray-500 group-hover:text-gray-700'>Upload more photos </p>
                     </label>

                                </>
                              )}

                    {
                      provided.placeholder
                    }      
                    
                        </div>
                      )}
                    </Droppable>
                  </DragDropContext>
                  <h4 className='h4 my-5'>How would your characterize the charm and excitement of your property?</h4>
                  <div className=''>
                    <h5 className='h5 '>Title:</h5>
                    <input value={formDescription.title} onChange={handleChangeDescription} className='bg-white text-sm outline-none border-none p-2 mb-2 rounded w-full' type="text" placeholder='Title' name='title'  required />
                   
                    <h5 className='h5 '>Description:</h5>
                    <textarea value={formDescription.description} onChange={handleChangeDescription} name="description" rows={10}
                     placeholder='Description...' required className='bg-white  p-2 text-sm outline-none border-none mb-2 rounded w-full resize-none' />
                 
                    <input onChange={handleChangeDescription} value={formDescription.price} className='bg-white text-sm outline-none border-none p-2 mb-2
                     rounded ' type="number" name='price' placeholder='100' required />
                </div>
               </div>
               <button type='submit' className='btn-secondary rounded-full'>Create Property</button>

        </form>
      </section>
    </>
  )
}

export default CreateListing
