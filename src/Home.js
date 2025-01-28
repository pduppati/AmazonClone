import React from 'react'
import './css/Home.css';
import Product from './Product';

function Home() {
  return (
    <div className='home'>
        <div className='home__container'>
            <img className='home__image'
                src='https://m.media-amazon.com/images/I/61gPd0h0boL._SX3000_.jpg'
                //src='https://static-assets.business.amazon.com/assets/global/images/social/homepage-social-graphic2.jpg.transform/1450x664/image.jpg'
                alt=''
            >
            </img>
            <div className='home__row'>
                <Product
                    id="1" 
                    title="Never Quit on a Bad Day: Inspiring Stories of Resilience - Thriving Entrepreneurs"
                    price={19.99}
                    image="https://m.media-amazon.com/images/I/61-ssHQ-7RL._SL1500_.jpg"
                    rating={5}
                />
                <Product 
                    id="2"
                    title="Echo Dot (5th Gen, 2022 release) | With bigger vibrant sound, helpful routines and Alexa | Charcoal"
                    price={49.99}
                    image="https://m.media-amazon.com/images/I/41A4PpLOwCL._AC_.jpg"
                    rating={2}
                />
               
            </div>
            <div className='home__row'>
                <Product 
                    id="3"
                    title="1PCS Mini LED Night Light for Kids, Cute Dolphin 7 Changing Colors LED Night Light Decoration Nightlight Children Kids Gift Night Lamp for Bedroom, Bedside, Living Room, Desk Decorations 1PCS"
                    price={9.99}
                    image="https://m.media-amazon.com/images/I/31lu0C9f1JL._AC_.jpg"
                    rating={4}
                />
                <Product 
                    id="4"
                    title="Amazon Essentials Women's Two Strap Heeled Sandal"
                    price={29.99}
                    image="https://m.media-amazon.com/images/I/71ExH06eUrL._AC_SX695_.jpg"
                    rating={3}
                />
                <Product 
                    id="5"
                    title="Amazon Essentials Men's Full-Zip Hooded Fleece Sweatshirt (Available in Big & Tall)"
                    price={39.99}
                    image="https://m.media-amazon.com/images/I/91BGszOvK4L._AC_SX679_.jpg"
                    rating={5}
                />
            </div>
            <div className='home__row'>
                <Product 
                    id="6"
                    title="BORGUSI Treadmill with Auto Incline, 300 LBS Capacity Running Machine with 17.5 Wide Belt, 3HP Folding Electric Treadmills with Bluetooth Speaker for Home, Up to 8.5 MPH Speed, 15 Preset Programs"
                    price={499.99}
                    image="https://m.media-amazon.com/images/I/71e5AV05jRL._AC_SY300_SX300_.jpg"
                    rating={4}
                />
            </div>
        </div>
    </div>
  )
}

export default Home
