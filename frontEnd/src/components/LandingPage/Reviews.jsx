import React from 'react'
import {Layout} from 'antd'
import { Content } from 'antd/es/layout/layout'
import ReviewContainer from './ReviewContainer'

const Reviews = ({ sectionRef }) => {
  return (
    <>
      <div ref={sectionRef} id='reviews'>
        <h3 className='text-center my-3'>What motivates Us to improve..!</h3>
        <Layout>
          <Content>
            <ReviewContainer/>
          </Content>
        </Layout>
      </div>
    </>
  )
}

export default Reviews