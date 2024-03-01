import React from 'react'
import Banner from '../../components/Banner'
import Categories from './Categories'
import SpecialDishes from './SpecialDishes'
import Services from './Services'
import Footer from '../../components/Footer'

const Home = () => {
  return (
    <div>
      <Banner/>
      <Categories/>
      <SpecialDishes/>
      <Services/>
     
    </div>
  )
}

export default Home