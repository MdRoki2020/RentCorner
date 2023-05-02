import React, { Suspense } from 'react'
import RentersNavigation from '../Pages/Renters/RentersNavigation';
import RentersDashboard from '../Pages/Renters/RentersDashboard';

const RentersDashboardLayout = () => {
  return (
    <div>
      <RentersNavigation>
        <Suspense>

          <RentersDashboard />

        </Suspense>
      </RentersNavigation>
    </div>
  )
}

export default RentersDashboardLayout
