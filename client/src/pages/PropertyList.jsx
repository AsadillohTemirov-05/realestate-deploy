import React from 'react'
import Header from '../components/Header'
import { useDispatch, useSelector } from 'react-redux'
import ListingCard from '../components/ListingCard';
import { setPropertyList } from '../redux/state';

const PropertyList = () => {
  const [loading,setLoading]=useState(true);
    const user=useSelector((state)=>state.user);
    const propertyList=user?.propertyList;

    const dispatch=useDispatch();


    const getPropertyList= async ()=>{
      try {
        const response=await fetch(`http://realestates:4000/users/${user._id}/listing`,{
          method:"GET", 
        });

        const data=await response.json();
        dispatch(setPropertyList(data));
        setLoading(false);
      } catch (error) {
        
      }
    }
  return (
    <>
      <Header/>
      <section className='max-padd-container pt-10'>
        <h3 className='h3'>Your Wish List</h3>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
           {wishList?.map(({_id,creator,listingPhotoPaths,
            city,province,country,category,type,price,title,description,
            booking=false
           })=>(<ListingCard key={_id} listingId={_id} creator={creator}
           listingPhotoPaths={listingPhotoPaths} city={city}
           province={province} country={country} category={category} 
           type={type} price={price} title={title} description={description}
           booking={booking} /> ))}
        </div>
      </section>
    </>
  )
}

export default PropertyList;

