import { useAppSelector } from '../../../redux/hooks';
import { useNavigate, useParams } from 'react-router-dom';
import './OrderCard.css';
import { Button } from '@mui/material';
import { useState } from 'react';
import OrderPostModal from './OrderPostModal';

export default function OrderCard(): JSX.Element {
  const { orderId } = useParams();
  const isWorker = useAppSelector((store) => store.userSlice.info.isWorker);
  const orders = useAppSelector((store) => store.orderSlice[`${isWorker ? 'ordersWorker' : 'ordersUser'}`]);
  const navigate = useNavigate();
  const order = orders.find((ord) => orderId && ord.id === Number(orderId));

  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="wrapperSummary">
      <div className="headerOrder">
        <div className="containerOrder">
          <div className="cardOrder">
            <div className="face face1">
              <div className="contentOrder">
                <div className="icon">
                  <i className="fa fa-twitter-square" aria-hidden="true">
                    <img className="imageCard" src="https://lapkins.ru/upload/resize_cache/uf/8a2/293_293_2/8a236308bc2b290669dda88b3ab09f55.jpg" alt="img" />
                  </i>
                </div>
              </div>
            </div>
            <div className="face face2">
              <div className="content">
                <h3>@{order?.Pet.petName}</h3>
                <p>{order?.Pet.petAbout}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bodyPosts" />
      <br />
      <br />
      <OrderPostModal open={modalOpen} handleClose={() => setModalOpen(false)} orderId={orderId} />
      <Button variant='outlined' onClick={() => setModalOpen(true)}>Добавить пост!</Button>
      <div className="card">
        <img
          src="https://images.unsplash.com/photo-1615147342761-9238e15d8b96?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1001&q=80"
          className="card__image"
          alt="brown couch"
        />
        <div className="card__content">
          <div className="time">27.08.2023, 14:10:00</div>
          <span className="card__title">Duis autem vel eum iriure dolor in hend in vulputate</span>
        </div>
      </div>
    </div>
  );
}
