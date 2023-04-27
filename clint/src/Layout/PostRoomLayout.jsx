import React, { Suspense } from 'react'
import RentersNavigation from '../Pages/Renters/RentersNavigation';
import PostRoom from '../Pages/Renters/PostRoom';

const PostAdLayout = () => {
  return (
    <div>
      <RentersNavigation>
        <Suspense>

          <PostRoom />

        </Suspense>
      </RentersNavigation>
    </div>
  )
}

export default PostAdLayout
