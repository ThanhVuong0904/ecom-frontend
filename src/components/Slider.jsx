import React from 'react'
import { Carousel } from 'react-bootstrap'
export default function Slider() {
     return (
          <Carousel>
               <Carousel.Item>
                    <img
                    className="d-block w-100 h-729"
                    src="https://routine.vn/media/wysiwyg/slider/HOMEPAGE-01.jpg"
                    alt="First slide"
                    />
               </Carousel.Item>
               <Carousel.Item>
                    <img
                    className="d-block w-100 h-729"
                    src="https://routine.vn/media/wysiwyg/slider/1900.jpg"
                    alt="Second slide"
                    />
                    <Carousel.Caption>
                    <h3>Second slide label</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </Carousel.Caption>
               </Carousel.Item>
               <Carousel.Item>
                    <img
                    className="d-block w-100 h-729"
                    src="https://routine.vn/media/wysiwyg/slider/z2914783850968_b716749e0f8ced0477e06c687235a8b1.jpg"
                    alt="Third slide"
                    />
               </Carousel.Item>
          </Carousel>
     )
}
