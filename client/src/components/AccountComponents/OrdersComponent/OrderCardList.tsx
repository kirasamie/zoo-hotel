/* eslint-disable react-hooks/rules-of-hooks */
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { useParams } from 'react-router-dom';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { useEffect, useState } from 'react';
import OrderPostModal from './OrderPostModal';
import OrderCard from './OrderCard';
import { fetchGetPostsByOrder } from '../../../redux/posts/postsThunkActions';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Keyboard } from 'swiper/modules';
import { ContentCut, School, PsychologyAlt, LocalTaxi, SoupKitchen, AddAPhoto, EmojiEvents } from '@mui/icons-material';

import 'swiper/css/pagination';
import 'swiper/css/navigation';
import CardGlassWrapper from '../../GlassWrapper/CardGlassWrapper';
import styles from './OrderCardList.module.css';
import StyledButton from '../../GlassWrapper/StyledButton';

const tooltipProps = {
  slotProps: {
    popper: {
      sx: {
        [`&.${tooltipClasses.popper}[data-popper-placement*="bottom"] .${tooltipClasses.tooltip}`]: {
          marginTop: '30px',
          fontSize: '13px',
          color: 'white',
        },
        [`&.${tooltipClasses.popper}[data-popper-placement*="top"] .${tooltipClasses.tooltip}`]: {
          marginBottom: '0px',
          fontSize: '13px',
          color: 'white',
        },
        [`&.${tooltipClasses.popper}[data-popper-placement*="right"] .${tooltipClasses.tooltip}`]: {
          marginLeft: '0px',
          fontSize: '13px',
          color: 'white',
        },
        [`&.${tooltipClasses.popper}[data-popper-placement*="left"] .${tooltipClasses.tooltip}`]: {
          marginRight: '0px',
          fontSize: '13px',
          color: 'white',
        },
      },
    },
  },
  followCursor: true,
  arrow: true,
};

export default function OrderCardList(): JSX.Element {
  const { orderId } = useParams();

  if (orderId === 'empty') {
    return (
      <div style={{ width: '60dvw' }}>
        <h3 className={styles.orderAboutHeader}>Похоже, у Вас пока нет ни одного заказа. Самое время это исправть!</h3>
      </div>
    );
  }

  const isWorker = useAppSelector((store) => store.userSlice.info.isWorker);
  const orders = useAppSelector((store) => store.orderSlice[`${isWorker ? 'ordersWorker' : 'ordersUser'}`]);
  const dispatch = useAppDispatch();
  const posts = useAppSelector((store) => store.postsSlice.posts);
  const order = orders.find((ord) => orderId && ord.id === Number(orderId));
  console.log('THIS IS ORDER', order);
  const pet = useAppSelector((store) => store.petSlice.pets.find((pet) => pet.id === order?.orderPetId));

  useEffect(() => {
    if (orderId && Number(orderId) !== 0) {
      dispatch(fetchGetPostsByOrder(Number(orderId)));
    }
  }, [dispatch, orderId]);

  const [modalOpen, setModalOpen] = useState(false);
  const [addServicesNumber, setAddServicesNumber] = useState([]);
  const optionNames = ['Груминг', 'Занятия с кинологом', 'Консультация зоопсихолога', 'Зоотакси', 'Приготовление пищи для питомца', 'Фотоотчет более 1 раза в день', 'Подготовка собаки к выставке'];

  useEffect(() => {
    const serviceIndexes = order?.addServices.split('').map((el) => Number(el) - 1);
    setAddServicesNumber(serviceIndexes);
  }, [order]);

  return (
    <div style={{ height: '100%' }}>
      <div className={styles.orderInfo}>
        <CardGlassWrapper styles={{ justifyContent: 'flex-start' }}>
          <div className={styles.orderInfoInnerWrapper}>
            {order?.Pet?.PetImages?.length !== 0 ? (
              <>
                {order?.Pet?.PetImages[0] && (
                  <div className={styles.petImg}>
                    <img className={styles.petImage} src={`${import.meta.env.VITE_URL.slice(0, -3)}/img/pets/${order?.Pet?.PetImages[0]?.link}`} alt="imagePet" />
                  </div>
                )}
              </>
            ) : order?.Pet?.petType === 1 ? (
              <div className={styles.petImg}>
                <img className={styles.petImage} src="/catAvatar.png" alt="cat" />
              </div>
            ) : (
              <div className={styles.petImg}>
                <img className={styles.petImage} src="/dogAvatar.png" alt="dog" />
              </div>
            )}

            <div className={styles.clientOrderAbout}>
              <div>
                <h3 className={styles.orderAboutHeader}>Информация о заказе</h3>
                <p>
                  Кличка: <span style={{ color: 'white' }}>{order?.Pet.petName}</span>
                </p>
                <p>
                  О питомце: <span style={{ color: 'white' }}>{order?.Pet.petAbout}</span>
                </p>
                <p>
                  Комментарий к заказу: <span style={{ color: 'white' }}>{order?.addInfo}</span>
                </p>
              </div>
              {addServicesNumber?.length !== 0 && (
                <div>
                  <h3 className={styles.orderAboutHeader}>Дополнительные услуги</h3>
                  <div className={styles.addServices}>
                    {addServicesNumber?.includes(0) && (
                      <Tooltip {...tooltipProps} title={optionNames[0]}>
                        <ContentCut fontSize="large" sx={{ color: 'white' }} />
                      </Tooltip>
                    )}
                    {addServicesNumber?.includes(1) && (
                      <Tooltip {...tooltipProps} title={optionNames[1]}>
                        <School fontSize="large" sx={{ color: 'white' }} />
                      </Tooltip>
                    )}
                    {addServicesNumber?.includes(2) && (
                      <Tooltip {...tooltipProps} title={optionNames[2]}>
                        <PsychologyAlt fontSize="large" sx={{ color: 'white' }} />
                      </Tooltip>
                    )}
                    {addServicesNumber?.includes(3) && (
                      <Tooltip {...tooltipProps} title={optionNames[3]}>
                        <LocalTaxi fontSize="large" sx={{ color: 'white' }} />
                      </Tooltip>
                    )}
                    {addServicesNumber?.includes(4) && (
                      <Tooltip {...tooltipProps} title={optionNames[4]}>
                        <SoupKitchen fontSize="large" sx={{ color: 'white' }} />
                      </Tooltip>
                    )}
                    {addServicesNumber?.includes(5) && (
                      <Tooltip {...tooltipProps} title={optionNames[5]}>
                        <AddAPhoto fontSize="large" sx={{ color: 'white' }} />
                      </Tooltip>
                    )}
                    {addServicesNumber?.includes(6) && (
                      <Tooltip {...tooltipProps} title={optionNames[6]}>
                        <EmojiEvents fontSize="large" sx={{ color: 'white' }} />
                      </Tooltip>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </CardGlassWrapper>
      </div>

      <OrderPostModal open={modalOpen} handleClose={() => setModalOpen(false)} orderId={orderId} />
      {isWorker && (
        <div style={{ margin: '0 20px 20px' }}>
          <StyledButton variant="outlined" fullWidth onClick={() => setModalOpen(true)}>
            Добавить пост!
          </StyledButton>
        </div>
      )}
      <div style={{ width: '60dvw' }}>
        <Swiper
          slidesPerView={1.1}
          centeredSlides={true}
          spaceBetween={30}
          keyboard={{
            enabled: true,
          }}
          modules={[Keyboard]}
          className="swiperPosts"
        >
          {posts.length ? (
            posts.map((post) => (
              <SwiperSlide key={post.id} className="swiperSlidePost">
                <OrderCard key={post.id} post={post} />
              </SwiperSlide>
            ))
          ) : (
            <CardGlassWrapper style={{ alignSelf: 'center' }}>
              <h3 style={{ color: 'orange' }}>Похоже, у питомца по кличке {order?.Pet?.petName} пока нет постов.</h3>
            </CardGlassWrapper>
          )}
        </Swiper>
      </div>
    </div>
  );
}
