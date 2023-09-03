import React, { Suspense } from 'react'
import RentersNavigation from '../Pages/Renters/RentersNavigation'
import RenterProfile from '../Pages/Renters/RenterProfile'

const RenterProfileLayout = () => {
  return (
    <div>
      <RentersNavigation>
        <Suspense>

          <RenterProfile />

        </Suspense>
      </RentersNavigation>
    </div>
  )
}

export default RenterProfileLayout
