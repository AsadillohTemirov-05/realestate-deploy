import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import CreateListing from './pages/CreateListing'
import ListingDetails from './pages/ListingDetails'
import TripList from './pages/TripList'
import WishList from './pages/WishList';
import PropertyList from './pages/PropertyList'
import ReservationList from './pages/ReservationList'

const App = () => {
  return (
    <BrowserRouter>
    <div className='text-[#404040] bg-primary'>
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/login' element={<Login/>} />
      <Route path='/register' element={<Register/>} />
      <Route path="/create-listing" element={<CreateListing/>} />
      <Route path='/listing/:listingId' element={<ListingDetails/>} />
      <Route path='/:userId/trips' element={<TripList/>} />
      <Route  path='/:userId/wishList' element={<WishList/>} />
      <Route path="/:userId/listing" element={<PropertyList />} />
      <Route path="/:userId/reservations" element={<ReservationList/>} />

    </Routes>
    </div>
    </BrowserRouter>
  )
}

export default App
