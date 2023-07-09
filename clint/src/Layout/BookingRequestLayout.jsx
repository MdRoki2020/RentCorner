import React, { Suspense } from 'react'
import BookingRequest from '../Pages/Renters/BookingRequest';
import RentersNavigation from '../Pages/Renters/RentersNavigation';

const BookingRequestLayout = () => {
  return (
    <div>
      <RentersNavigation>
        <Suspense>
            <BookingRequest/>
        </Suspense>
      </RentersNavigation>
    </div>
  )
}

export default BookingRequestLayout
