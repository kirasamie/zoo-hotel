import './HomePage.css';

import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

export default function HomePage(): JSX.Element {
  const arrImages = ['first', 'second', 'third', 'fourd'];
  return (
    <>
    <div className='textContainerLeft'>
    </div>
      <div className='landing__info align__left'>
        <h1 className='textContent'>ZOoтель</h1>
        <p className='textContent'>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error aut ea
          fuga cum? Odit, sed culpa harum laborum excepturi quibusdam!
        </p>
        <br />
        <button className='textContent'>
          <a href='#/'>Забронировать комнату</a>
        </button>
      </div>

      <div className='body'>
        <section className='container__center' id='landing__area'>
          <div className='landing__content center__row'>
            <Swiper
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              pagination={{
                clickable: true,
              }}
              modules={[Autoplay, Pagination]}
              className='mySwiper'
            >
              {arrImages.map((image) => (
                <SwiperSlide>
                  <div className='image__pet'>
                    <img src={`./img/main/${image}.jpg`} alt='animal' />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </section>
      </div>
    </>
  );
}
