import React from 'react'
import Slide from '../components/Slide/Slide'
import Img1 from '../assets/images/sign-in-background.jpg'
import Img2 from '../assets/images/slide/843017.jpg'
import Img3 from '../assets/images/slide/69940876_p0.jpg'
import Img4 from '../assets/images/slide/80678254_p0.png'
import Img5 from '../assets/images/slide/90826733_p0.png'

const TestComponent = () => {
  const items = [
    {
      src: Img1,
    },
    {
      src: Img2,
    },
    {
      src: Img3,
    },
    {
      src: Img4,
    },
    {
      src: Img5,
    },
  ]
  return (
    <div className="bg-white h-screen w-full flex items-center justify-center">
      <div className="w-[80%]">
        <Slide items={items} delay={3000} />
      </div>
    </div>
  )
}

export default TestComponent
