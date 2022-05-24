import React from 'react'
import Carousel from './carousel'
import Categories from './categories'
import Courses from './courses'
import InfoElearning from './infoElearning'
import People from './people'

export default function HomePage() {
  return (
    <>
    <Carousel/>
    <Categories/>
    <Courses />
    <InfoElearning/>
    <People/>
    </>
  )
}
