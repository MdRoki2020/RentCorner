import React, { Fragment } from 'react'
import NavigationBar from '../Pages/Users/NavigationBar'
import Blog from '../Pages/Users/Blog'

const BlogLayout = () => {
  return (
    <Fragment>
      <NavigationBar />
      <Blog />
    </Fragment>
  )
}

export default BlogLayout
