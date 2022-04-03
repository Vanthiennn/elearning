import React from 'react'
import Carousel from '../_components/carousel/Carousel'
import Categories from '../_components/categories/Categories'
import Courses from '../_components/courses/Courses'
import InfoElearning from '../_components/infoElearning'
import People from '../_components/people'

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
