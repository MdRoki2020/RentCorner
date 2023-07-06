import React, { Suspense } from 'react'
import RentersNavigation from '../Pages/Renters/RentersNavigation';
import UpdateRoom from '../Pages/Renters/UpdateRoom';

const UpdateRoomLayout = () => {
  return (
    <div>
      <RentersNavigation>
        <Suspense>

          <UpdateRoom />

        </Suspense>
      </RentersNavigation>
    </div>
  )
}

export default UpdateRoomLayout
