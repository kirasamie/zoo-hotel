import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { useParams } from 'react-router-dom';
import './OrderCardList.css';
import { Button } from '@mui/material';
import { useEffect, useState } from 'react';
import OrderPostModal from './OrderPostModal';
import OrderCard from './OrderCard';
import { fetchGetPostsByOrder } from '../../../redux/posts/postsThunkActions';

export default function OrderCardList(): JSX.Element {
  const { orderId } = useParams();
  const isWorker = useAppSelector((store) => store.userSlice.info.isWorker);
  const orders = useAppSelector((store) => store.orderSlice[`${isWorker ? 'ordersWorker' : 'ordersUser'}`]);
  const dispatch = useAppDispatch();
  const posts = useAppSelector((store) => store.postsSlice.posts);
  const order = orders.find((ord) => orderId && ord.id === Number(orderId));

  useEffect(() => {
    console.log('before dispatching posts', orderId);
    if (orderId && Number(orderId) !== 0) {
      console.log('dispatching posts', orderId);
      dispatch(fetchGetPostsByOrder(Number(orderId)));
    }
  }, [dispatch, orderId]);

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
      {isWorker && (
        <Button variant="outlined" onClick={() => setModalOpen(true)}>
          Добавить пост!
        </Button>
      )}
      {posts.length ? posts.map((post) => <OrderCard key={post.id} post={post} />) : null}
    </div>
  );
}
