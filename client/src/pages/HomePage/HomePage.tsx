import "./HomePage.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import {
  YMaps,
  Map,
  FullscreenControl,
  Placemark,
  TypeSelector,
  TrafficControl,
} from "@pbe/react-yandex-maps";
import "swiper/css";
import "swiper/css/navigation";
import styles from "./HomePage.module.css";
import GlassWrapper from "../../components/GlassWrapper/GlassWrapper";
import CardGlassWrapper from "../../components/GlassWrapper/CardGlassWrapper";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Link } from "react-router-dom";
import cn from "classnames";

const handlerUp = () => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
};

export default function HomePage(): JSX.Element {
  const arrImages = [
    "one.png",
    "two.png",
    "three.png",
    "fourd.jpg",
    "five.png",
    "six.png",
    "seven.png",
    "eight.png",
  ];

  return (
    <>
      <div className={styles.mainBackground}></div>
      <div className="textContainerLeft"></div>
      <div className="landing__info align__left">
        <h1 className="textContent">ZOOHOTEL</h1>
        <p className="textContent">
          отель, предназначенный для ваших чудесных питомцев, пока вы будете
          вдали от них
        </p>
        <br />
        <button className={cn("textContent", styles.btnReservation)}>
          <Link to="/rooms" className={styles.reservationBtn}>
            Забронировать комнату
          </Link>
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
                    <img src={`./img/main/${image}`} alt="animal" />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </section>
      </div>

      <div className={styles.homePageShader}></div>

      <GlassWrapper width="90vw">
        <div className="home-steps-wrapper">
          <h2 style={{ marginBottom: "50px" }}>
            Для того, чтобы начать пользоваться нашим сервисом нужно сделать три
            простых шага:
          </h2>
          <div className={styles.homeStepsCardWrapper}>
            <CardGlassWrapper width="25vw">
              <div className="step step-1" />
              <h3>Шаг 1:</h3>
              <div>
                <img
                  className={styles.imgForm}
                  src="/img/step-1.png"
                  alt="reg"
                />
              </div>
              <div className={styles.stepParagraphWrapper}>
                <p style={{ color: "white", textAlign: "center" }}>
                  Ознакомьтесь с правилами и зарегистрируйтесь
                </p>
              </div>
            </CardGlassWrapper>

            <CardGlassWrapper width="25vw">
              <div className="step step-2" />
              <h3>Шаг 2:</h3>
              <div>
                <img
                  className={styles.imgForm}
                  src="/img/step-2.png"
                  alt="reg"
                />
              </div>
              <div className={styles.stepParagraphWrapper}>
                <p style={{ color: "white", textAlign: "center" }}>
                  Заполните карточку вашего четвероногого друга в личном
                  кабинете
                </p>
              </div>
            </CardGlassWrapper>

            <CardGlassWrapper width="25vw">
              <div className="step step-3" />
              <h3>Шаг 3:</h3>
              <div>
                <img
                  className={styles.imgForm}
                  src="/img/step-3.png"
                  alt="reg"
                />
              </div>
              <div className={styles.stepParagraphWrapper}>
                <p style={{ color: "white", textAlign: "center" }}>
                  Забронируйте комнату в нашем отеле!
                </p>
              </div>
            </CardGlassWrapper>
          </div>
        </div>
      </GlassWrapper>
      <GlassWrapper width="90vw">
        <div className={styles.servicesContainer}>
          <h2 className={styles.servHeader2}>Наши услуги</h2>
          <h3 className={styles.servHeader3}>Преимущества ZooHotel</h3>
          <div className={styles.services}>
            <CardGlassWrapper>
              <div className={styles.iconText}>
                <div className={styles.imgWrapper}>
                  <img className={styles.img} src="/img/room.png" alt="dog" />
                </div>
                <div className={styles.servHeaderWrapper}>
                  <p className={styles.servHeader}>Индивидуальные комнатки</p>
                </div>
                <div className={styles.servContentWrapper}>
                  <p className={styles.servContent}>
                    Комфорт и уход, достойный вашего питомца
                  </p>
                </div>
              </div>
            </CardGlassWrapper>
            <CardGlassWrapper>
              <div className={styles.iconText}>
                <div className={styles.imgWrapper}>
                  <img
                    className={styles.img}
                    src="/img/walkingDog.png"
                    alt="dog"
                  />
                </div>
                <div className={styles.servHeaderWrapper}>
                  <p className={styles.servHeader}>Выгул 2-3 раза в день</p>
                </div>
                <div className={styles.servContentWrapper}>
                  <p className={styles.servContent}>
                    Ваш питомец не останется без внимания
                  </p>
                </div>
              </div>
            </CardGlassWrapper>
            <CardGlassWrapper>
              <div className={styles.iconText}>
                <div className={styles.imgWrapper}>
                  <img
                    className={styles.img}
                    src="/img/camera.png"
                    alt="camera"
                  />
                </div>
                <div className={styles.servHeaderWrapper}>
                  <p className={styles.servHeader}>Фото-отчет ежедневно</p>
                </div>
                <div className={styles.servContentWrapper}>
                  <p className={styles.servContent}>
                    Постоянная связь и визуальная информация о вашем друге
                  </p>
                </div>
              </div>
            </CardGlassWrapper>
            <CardGlassWrapper>
              <div className={styles.iconText}>
                <div className={styles.imgWrapper}>
                  <img
                    className={styles.img}
                    src="/img/dogFood.png"
                    alt="dogFood"
                  />
                </div>
                <div className={styles.servHeaderWrapper}>
                  <p className={styles.servHeader}>Миски и лежанки</p>
                </div>
                <div className={styles.servContentWrapper}>
                  <p className={styles.servContent}>
                    Питательный рацион и отличный отдых для любых пород собак и
                    кошек
                  </p>
                </div>
              </div>
            </CardGlassWrapper>
            <CardGlassWrapper>
              <div className={styles.iconText}>
                <div className={styles.imgWrapper}>
                  <div className={styles.iconContainer}>
                    <img
                      className={styles.imgIcon}
                      src="/img/groom.png"
                      alt="dogFood"
                    />
                    <div>
                      <img
                        className={styles.imgIcon}
                        src="/img/training.png"
                        alt="dogFood"
                      />
                      <img
                        className={styles.imgIcon}
                        src="/img/taxi.png"
                        alt="dogFood"
                      />
                    </div>
                  </div>
                </div>
                <div className={styles.servHeaderWrapper}>
                  <p className={styles.servHeader}>Дополнительные услуги</p>
                </div>
                <div className={styles.servContentWrapper}>
                  <p className={styles.servContent}>
                    Груминг, занятия с кинологом, зоотакси и многое другое
                  </p>
                </div>
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

      <GlassWrapper width="90vw" style={{ marginBottom: "100px" }}>
        <h2 className={styles.servHeader2}>Мы на карте</h2>
        {/* <h3 className={styles.servHeader3}></h3> */}
        <YMaps>
          <div className="ya-map-wrapper">
            <Map
              className="ya-map"
              defaultState={{
                center: [46.287837853706414, 47.94919350240244],
                zoom: 13,
              }}
            >
              <FullscreenControl />
              <Placemark
                geometry={[46.287837853706414, 47.94919350240244]}
                modules={["geoObject.addon.balloon"]}
                properties={{
                  balloonContent: "dasda",
                  balloonContentHeader: "ZOOHOTEL",
                  balloonContentBody:
                    '<img src="/img/logo.svg" alt="our logo" style="height: 100px; width: 100px" /><p style="width: 290px; color: lightyellow;">Преданный персонал обеспечивает круглосуточный уход и индивидуальный подход, чтобы каждый пушистый гость чувствовал себя, как дома</p>',
                  balloonContentFooter: "with love by KirKateJuckie",
                  autoPan: true,
                }}
                options={{
                  preset: "islands#blackDogIcon",
                }}
              />
              <TypeSelector options={{ float: "right" }} />
              <TrafficControl options={{ float: "right" }} />
            </Map>
          </div>
        </YMaps>
      </GlassWrapper>
      <a className={styles.buttonUp} onClick={() => void handlerUp()}>
        <ArrowBackIosIcon
          sx={{
            width: 50,
            height: 50,
            rotate: "90deg",
            position: "fixed",
            bottom: 75,
          }}
        />
      </a>
    </>
  );
}
