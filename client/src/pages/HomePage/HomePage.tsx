import './HomePage.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';

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
    </>
  );
}
