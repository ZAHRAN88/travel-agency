'use client'
import { mockPackages } from '@/mockData'
import React, { useState } from 'react'
import PackagesGrid from './PackagesGrid'

const Packages = () => {
  
  const [pckgs,setPckgs] = useState<Package[]>(mockPackages)
  
  return (
    <div>
      <PackagesGrid packages={pckgs}/>
    </div>
  )
}

export default Packages
