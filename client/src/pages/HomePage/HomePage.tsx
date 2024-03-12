import './HomePage.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { YMaps, Map, FullscreenControl, Placemark, TypeSelector, TrafficControl } from '@pbe/react-yandex-maps';

import 'swiper/css';
import 'swiper/css/navigation';
import styles from './HomePage.module.css';
import GlassWrapper from '../../components/GlassWrapper/GlassWrapper';
import CardGlassWrapper from '../../components/GlassWrapper/CardGlassWrapper';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

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
const handlerUp = () => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth',
  });
}

export default function HomePage(): JSX.Element {
  const arrImages = ['one.png', 'two.png', 'three.png', 'fourd.jpg', 'five.png', 'six.png', 'seven.png', 'eight.png'];
  // document.body.style.backgroundImage = 'url("/background-filler-v2.png")';
  // document.body.style.backgroundColor = 'rgb(15, 14, 14)';

  return (
    <>
      <div className={styles.mainBackground}></div>
      <div className='textContainerLeft'></div>
      <div className='landing__info align__left'>
        <h1 className='textContent'>ZOoтель</h1>
        <p className='textContent'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error aut ea fuga cum? Odit, sed culpa harum laborum excepturi quibusdam!</p>
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
                <SwiperSlide key={image}>
                  <div className='image__pet'>
                    <img src={`./img/main/${image}`} alt='animal' />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </section>
      </div>

      <div className={styles.homePageShader}></div>

      <GlassWrapper width='90vw'>
        <div className='home-steps-wrapper'>
          <h2>Для того, чтобы начать пользоваться нашим сервисом нужно сделать три простых шага:</h2>
          <div className='home-steps-card-wrapper' style={{ gap: '10px' }}>
            <CardGlassWrapper width='450px'>
              <div className='step step-1' />
              <h3>Шаг 1:</h3>
              <div>
                <img className={styles.imgForm} src='/img/reg.png' alt='reg' />
              </div>
              <div>
                <p style={{ color: 'white' }}>Ознакомьтесь с правилами и зарегистрируйтесь</p>
              </div>
            </CardGlassWrapper>

            <CardGlassWrapper width='450px'>
              <div className='step step-2' />
              <h3>Шаг 2:</h3>
              <div>
                <img className={styles.imgForm} src='/img/petForm.png' alt='reg' />
              </div>
              <div>
                <p style={{ color: 'white' }}>Заполните карточку вашего четвероного друга в личном кабинете</p>
              </div>
            </CardGlassWrapper>

            <CardGlassWrapper width='450px'>
              <div className='step step-3' />
              <h3>Шаг 3:</h3>
              <div>
                <img className={styles.imgForm} src='/img/petForm.png' alt='reg' />
              </div>
              <div>
                <p style={{ color: 'white' }}>Забронируйте комнату в нашем отеле!</p>
              </div>
            </CardGlassWrapper>
          </div>
        </div>
      </GlassWrapper>
      <GlassWrapper width='90vw'>
        <div className={styles.servicesContainer}>
          <h2 className={styles.servHeader2}>Наши услуги</h2>
          <h3 className={styles.servHeader3}>Преимущества ZooHotel</h3>
          <div className={styles.services}>
            <CardGlassWrapper>
              <div className={styles.iconText}>
                <div className={styles.imgWrapper}>
                  <img className={styles.img} src='/img/room.png' alt='dog' />
                </div>
                <p className={styles.servHeader}>Индивидуальные комнатки</p>
                <p className={styles.servContent}>Комфорт и уход, достойный вашего питомца</p>
              </div>
            </CardGlassWrapper>
            <CardGlassWrapper>
              <div className={styles.iconText}>
                <div className={styles.imgWrapper}>
                  <img className={styles.img} src='/img/walkingDog.png' alt='dog' />
                </div>
                <p className={styles.servHeader}>Выгул 2-3 раза в день</p>
                <p className={styles.servContent}>Ваш питомец не останется без внимания</p>
              </div>
            </CardGlassWrapper>
            <CardGlassWrapper>
              <div className={styles.iconText}>
                <div className={styles.imgWrapper}>
                  <img className={styles.img} src='/img/camera.png' alt='camera' />
                </div>
                <p className={styles.servHeader}>Фото-отчет ежедневно</p>
                <p className={styles.servContent}>Постоянная связь и визуальная информация о вашем друге</p>
              </div>
            </CardGlassWrapper>
            <CardGlassWrapper>
              <div className={styles.iconText}>
                <div className={styles.imgWrapper}>
                  <img className={styles.img} src='/img/dogFood.png' alt='dogFood' />
                </div>
                <p className={styles.servHeader}>Миски и лежанки</p>
                <p className={styles.servContent}>Питательный рацион и отличный отдых для любых пород собак и кошек</p>
              </div>
            </CardGlassWrapper>
            <CardGlassWrapper>
              <div className={styles.iconText}>
                <div className={styles.imgWrapper}>
                  <div className={styles.iconContainer}>
                    <img className={styles.imgIcon} src='/img/groom.png' alt='dogFood' />
                    <div>
                      <img className={styles.imgIcon} src='/img/training.png' alt='dogFood' />
                      <img className={styles.imgIcon} src='/img/taxi.png' alt='dogFood' />
                    </div>
                  </div>
                </div>
                <p className={styles.servHeader}>Дополнительные услуги</p>
                <p className={styles.servContent}>Груминг, занятия с кинологом, зоотакси и многое другое</p>
              </div>
            </CardGlassWrapper>
          </div>
        </div>
      </GlassWrapper>
      {/* <GlassWrapper width="90vw">
        <div className={styles.servicesContainer}>
          <h2 className={styles.servHeader2}>
            Забронируйте место для вашего питомца прямо сейчас
          </h2>
          <h3 className={styles.servHeader3}>
            Профессиональные услуги передержки и ухода за домашними питомцами
          </h3>
          <p>
            тут должна быть кнопка с условной версткой если юзверь залогинился
            или нет (редирект на кномнаты или регистрацию)
          </p>
        </div>
      </GlassWrapper> */}

      <GlassWrapper width='90vw' style={{ marginBottom: '200px' }}>
        <h2 className={styles.servHeader2}>Мы на карте</h2>
        <h3 className={styles.servHeader3}>Лорем хренем ипсум шмипсум бибиди бобиди бум</h3>
        <YMaps>
          <div className='ya-map-wrapper'>
            <Map
              className='ya-map'
              defaultState={{
                center: [46.287837853706414, 47.94919350240244],
                zoom: 13,
              }}
            >
              <FullscreenControl />
              <Placemark
                geometry={[46.287837853706414, 47.94919350240244]}
                modules={['geoObject.addon.balloon']}
                properties={{
                  balloonContent: 'dasda',
                  balloonContentHeader: 'Zoотель',
                  balloonContentBody: '<h1 class="ya-map-placemark">ZH</h1><p style="width: 200px">Описание нашего прекрасного отеля которое я не придумал</p>',
                  balloonContentFooter: 'with love by KirKateJuckie',
                  autoPan: true,
                }}
                options={{
                  preset: 'islands#blackDogIcon',
                }}
              />
              <TypeSelector options={{ float: 'right' }} />
              <TrafficControl options={{ float: 'right' }} />
            </Map>
          </div>
        </YMaps>
      </GlassWrapper>
      <a className={styles.buttonUp} onClick={() => void handlerUp()}>
        <ArrowBackIosIcon sx={{ width: 50, height: 50, rotate: '90deg', position: 'fixed', bottom: 75 }} />
      </a>
    </>
  );
}
