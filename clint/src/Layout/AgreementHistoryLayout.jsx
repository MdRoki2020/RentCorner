import React, { Suspense } from 'react'
import RentersNavigation from '../Pages/Renters/RentersNavigation'
import AgreementHistory from '../Pages/Renters/AgreementHistory'

const AgreementHistoryLayout = () => {
  return (
    <div>
      <RentersNavigation>
        <Suspense>
            <AgreementHistory />
        </Suspense>
      </RentersNavigation>
    </div>
  )
}

export default AgreementHistoryLayout
