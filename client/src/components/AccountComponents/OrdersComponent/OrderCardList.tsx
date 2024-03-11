/* eslint-disable react-hooks/rules-of-hooks */
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { useParams } from "react-router-dom";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import OrderPostModal from "./OrderPostModal";
import OrderCard from "./OrderCard";
import { fetchGetPostsByOrder } from "../../../redux/posts/postsThunkActions";
import { Swiper, SwiperSlide } from "swiper/react";
import { Keyboard, Navigation } from "swiper/modules";

import "swiper/css/pagination";
import "swiper/css/navigation";
import CardGlassWrapper from "../../GlassWrapper/CardGlassWrapper";
import styles from "./OrderCardList.module.css";
import StyledButton from "../../GlassWrapper/StyledButton";

export default function OrderCardList(): JSX.Element {
  const { orderId } = useParams();

  if (orderId === "empty") {
    return (
      <div style={{ width: "60dvw" }}>
        <h3 className={styles.orderAboutHeader}>
          Похоже, у Вас пока нет ни одного заказа. Самое время это исправть!
        </h3>
      </div>
    );
  }

  const isWorker = useAppSelector((store) => store.userSlice.info.isWorker);
  const orders = useAppSelector(
    (store) => store.orderSlice[`${isWorker ? "ordersWorker" : "ordersUser"}`]
  );
  const dispatch = useAppDispatch();
  const posts = useAppSelector((store) => store.postsSlice.posts);
  const order = orders.find((ord) => orderId && ord.id === Number(orderId));
  console.log("THIS IS ORDER", order);
  const pet = useAppSelector((store) =>
    store.petSlice.pets.find((pet) => pet.id === order?.orderPetId)
  );

  useEffect(() => {
    if (orderId && Number(orderId) !== 0) {
      dispatch(fetchGetPostsByOrder(Number(orderId)));
    }
  }, [dispatch, orderId]);

  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div>
      <div className={styles.orderInfo}>
        <CardGlassWrapper>
          <div className={styles.orderInfoInnerWrapper}>
            <img className={styles.petImg} src={`${import.meta.env.VITE_URL.slice(0, -3)}/img/pets/${order?.Pet?.PetImages[0]?.link}`} alt='img' />
            <div className={styles.orderAbout}>
              <h3 className={styles.orderAboutHeader}>Информация о заказе</h3>
              <p>
                Кличка питомца:{" "}
                <span style={{ color: "white" }}>{order?.Pet.petName}</span>
              </p>
              <p>
                О питомце:{" "}
                <span style={{ color: "white" }}>{order?.Pet.petAbout}</span>
              </p>
            </div>
          </div>
        </CardGlassWrapper>
      </div>

      <OrderPostModal
        open={modalOpen}
        handleClose={() => setModalOpen(false)}
        orderId={orderId}
      />
      {isWorker && (
        <div style={{ margin: "0 20px 20px" }}>
          <StyledButton
            variant="outlined"
            fullWidth
            onClick={() => setModalOpen(true)}
          >
            Добавить пост!
          </StyledButton>
        </div>
      )}
      <div style={{ width: "60dvw" }}>
        <Swiper
          slidesPerView={1.1}
          centeredSlides={true}
          spaceBetween={30}
          keyboard={{
            enabled: true,
          }}
          modules={[Keyboard]}
          className='swiperPosts'
        >
          {posts.length
            ? posts.map((post) => (
                <SwiperSlide key={post.id} className='swiperSlidePost'>
                  <OrderCard key={post.id} post={post} />
                </SwiperSlide>
              ))
            : null}
        </Swiper>
      </div>
    </div>
  );
}
