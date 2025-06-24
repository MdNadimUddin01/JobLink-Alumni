import { useState } from 'react'
import { BannerSlider, Card, Navbar } from './Component'
import { forum } from "./assets/Slider/Svg/Herosection.js"
import { SignIn } from "./Component"
import { Home } from './Pages'
import { AddEvent } from './Component/Admin'
import { Event } from './Pages/Admin/Event.jsx'


function App() {

  const cardArray = [
    {
      "title": "Alumni",
      "content": "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Itaque dicta praesentium temporibus totam voluptate culpa amet perferendis corporis excepturi reiciendis ab aliquam voluptatum, repudiandae ipsam repellendus quis sequi quasi expedita.",
      "icon": forum
    },
    {
      "title": "Forum",
      "content": "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Itaque dicta praesentium temporibus totam voluptate culpa amet perferendis corporis excepturi reiciendis ab aliquam voluptatum, repudiandae ipsam repellendus quis sequi quasi expedita.",
      "icon": forum
    },
    {
      "title": "Events",
      "content": "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Itaque dicta praesentium temporibus totam voluptate culpa amet perferendis corporis excepturi reiciendis ab aliquam voluptatum, repudiandae ipsam repellendus quis sequi quasi expedita.",
      "icon": forum
    }
  ]
  return (
    <div className='mx-auto bg-gradient-to-b from-gary-50 to-gray-50 min-h-screen'>


      {/* <Navbar/>
      <BannerSlider />
      {
        cardArray.map((card) => (
          <Card title={card.title} content={card.content} />
        ))
      } */}

      {/* <AddEvent /> */}
      <Event/>
      {/* <SignIn/> */}
    </div>
  )
}

export default App
