import React, { useState } from 'react';
import { PostType } from '../../../redux/posts/postsSlice';
import { useAppSelector } from '../../../redux/hooks';
import { Button } from '@mui/material';
import styles from './OrderCard.module.css';

type PostPropsType = {
  post: PostType;
};

const OrderCard = React.memo(({ post }: PostPropsType) => {
  const [showComment, setShowComment] = useState(false);
  const user = useAppSelector((store) => store.userSlice.info);
  const getFancyDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const today = new Date().toLocaleDateString();
    return `${
      date.toLocaleDateString() === today
        ? 'Сегодня,'
        : date.toLocaleDateString()
    } в ${date.toLocaleTimeString().slice(0, -3)}`;
  };

  return (
    <>
      <div className='card'>
        <img
          src={`${import.meta.env.VITE_URL.slice(0, -3)}/img/posts/${
            post.postPhotoLink
          }`}
          className='card__image'
          alt='post photo'
        />
        <div className='card__content'>
          <span className='card__title'>{post.title}</span>
          <br />
          <br />
          <p>{post.body}</p>
          <br />
          <div className='time'>{getFancyDate(post.createdAt)}</div>
          {user.isWorker ? null : (
            <div className={styles.commentaryDiv}>
              {showComment ? (
                 <Button
                 variant='outlined'
                 color='success'
                 className='commentaryButton'
                 onClick={() => void setShowComment((prev) => !prev)}
               >
                 Комментировать
               </Button>
              )
              :
              (
                <Button
                variant='outlined'
                color='error'
                className='commentaryButton'
                onClick={() => void setShowComment((prev) => !prev)}
              >
                Закрыть
              </Button>
              )
              }
            </div>
          )}
        </div>
      </div>
      <div>{showComment ? null : <div>hello</div>}</div>
    </>
  );
});

export default OrderCard;
