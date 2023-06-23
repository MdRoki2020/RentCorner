import React from 'react'
import Tracker from '../Pages/Users/Tracker'
import NavigationBar from '../Pages/Users/NavigationBar'

const TrackerLayout = () => {
  return (
    <div>
        <NavigationBar />
        <Tracker/>
    </div>
  )
}

export default TrackerLayout