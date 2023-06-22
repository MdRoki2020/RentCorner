import React, { Suspense } from 'react'
import RentersNavigation from '../Pages/Renters/RentersNavigation'
import UpdateMap from '../Pages/Renters/UpdateMap'

const UpdateMapLayout = () => {
  return (
    <div>
        <RentersNavigation>
        <Suspense>

          <UpdateMap />

        </Suspense>
      </RentersNavigation>
    </div>
  )
}

export default UpdateMapLayout