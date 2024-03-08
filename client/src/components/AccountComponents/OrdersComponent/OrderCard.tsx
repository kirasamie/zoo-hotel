import React, { ChangeEvent, useState } from 'react';
import { PostType } from '../../../redux/posts/postsSlice';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { Button, TextField } from '@mui/material';
import styles from './OrderCard.module.css';
import { fetchAddNewComment } from '../../../redux/comment/async-action';

type PostPropsType = {
  post: PostType;
};

export type InputType = {
  body: string;
};

const OrderCard = React.memo(({ post }: PostPropsType) => {
  const dispatch = useAppDispatch();
  const comments = useAppSelector((store) => store.commentSlice.comments);

  const [showComment, setShowComment] = useState(false);
  const [input, setInput] = useState<InputType>({ body: '' });
  const handlerChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handlerAddComment = async (): Promise<void> => {
    void dispatch(fetchAddNewComment({ postId: post.id, input }));
    setInput({ body: '' });
    setShowComment(false);
  };

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
                  color='error'
                  className='commentaryButton'
                  onClick={() => void setShowComment((prev) => !prev)}
                >
                  Закрыть
                </Button>
              ) : (
                <Button
                  variant='outlined'
                  color='success'
                  className='commentaryButton'
                  onClick={() => void setShowComment((prev) => !prev)}
                >
                  Комментировать
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
      <div className='comments'>
        {comments?.map((comment, i) => (
          <h2>{comment.body}</h2>
        ))}
      </div>
      <div>
        {showComment ? (
          <form className={styles.addComment}>
            <TextField
              id='standard-basic'
              label='Напишите комментарий'
              variant='standard'
              onChange={(e: HTMLInputElement) => void handlerChange(e)}
              name='body'
              value={input.body}
            />
            <Button
              variant='outlined'
              color='success'
              onClick={() => void handlerAddComment()}
            >
              Опубликовать
            </Button>
          </form>
        ) : null}
      </div>
    </>
  );
});

export default OrderCard;
