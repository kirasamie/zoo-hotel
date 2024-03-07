import './HomePage.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { YMaps, Map, FullscreenControl, Placemark, TypeSelector, TrafficControl } from '@pbe/react-yandex-maps';

import 'swiper/css';
import 'swiper/css/navigation';

// const placemark = new Placemark([55.75, 37.61], {
//   balloonContent: '<img src="http://img-fotki.yandex.ru/get/6114/82599242.2d6/0_88b97_ec425cf5_M" />',
//   iconContent: "Azerbaijan"
// }, {
//   preset: "islands#yellowStretchyIcon",
//   // Disabling the close balloon button.
//   balloonCloseButton: false,
//   // The balloon will open and close when the placemark icon is clicked.
//   hideIconOnBalloonOpen: false
// });
// geoMap.geoObjects.add(placemark);

export default function HomePage(): JSX.Element {
  const arrImages = ['first', 'second', 'third', 'fourd'];
  return (
    <>
      <div className="textContainerLeft"></div>
      <div className="landing__info align__left">
        <h1 className="textContent">ZOoтель</h1>
        <p className="textContent">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error aut ea fuga cum? Odit, sed culpa harum laborum excepturi quibusdam!</p>
        <br />
        <button className="textContent">
          <a href="#/">Забронировать комнату</a>
        </button>
      </div>

      <div className="body">
        <section className="container__center" id="landing__area">
          <div className="landing__content center__row">
            <Swiper
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              pagination={{
                clickable: true,
              }}
              modules={[Autoplay, Pagination]}
              className="mySwiper"
            >
              {arrImages.map((image) => (
                <SwiperSlide key={image}>
                  <div className="image__pet">
                    <img src={`./img/main/${image}.jpg`} alt="animal" />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </section>
      </div>
      <div className="home-steps-wrapper">
        <h2>Для того, чтобы начать пользоваться нашим сервисом нужно сделать три простых шага:</h2>
        <div className="home-steps-card-wrapper">
          <div className="home-steps-card">
            <div className="step step-1" />
            <h3>Шаг 1:</h3>
            <div>
              <p>Ознакомьтесь с правилами и зарегистрируйтесь</p>
            </div>
          </div>
          <div className="home-steps-card">
            <div className="step step-2" />
            <h3>Шаг 2:</h3>
            <div>
              <p>Заполните карточку вашего четверомногоногнмогого друга</p>
            </div>
          </div>
          <div className="home-steps-card">
            <div className="step step-3" />
            <h3>Шаг 3:</h3>
            <div>
              <p>Забронируйте комнату в нашем отеле!</p>
            </div>
          </div>
        </div>
      </div>
      <YMaps>
        <div className="ya-map-wrapper">
          <Map className="ya-map" defaultState={{ center: [46.287837853706414, 47.94919350240244], zoom: 13 }}>
            <FullscreenControl />
            <Placemark
              geometry={[46.287837853706414, 47.94919350240244]}
              // options={ balloonContentBody: 'yandex zaebis' }
            />
            <TypeSelector options={{ float: 'right' }} />
            <TrafficControl options={{ float: 'right' }} />
          </Map>
        </div>
      </YMaps>
    </>
  );
}
