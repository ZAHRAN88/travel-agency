"use client"
import React, { useState } from 'react'
import TripsGrid from './TripsGrid'
import { mockTrips } from '@/mockData'

const TripsPage = () => {
  const [trips,setTrips]=useState<Trip[]>(mockTrips)
  return (
    <div>
      <h1 className="text-2xl text-center my-5 font-bold">Available Trips</h1>
      <TripsGrid trips={trips} />
    </div>
  )
}

export default TripsPage
