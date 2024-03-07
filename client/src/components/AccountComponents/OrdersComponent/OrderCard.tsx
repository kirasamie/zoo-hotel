import React from 'react';
import { PostType } from '../../../redux/posts/postsSlice';

type PostPropsType = {
  post: PostType;
};

const OrderCard = React.memo(({ post }: PostPropsType) => {
  const getFancyDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const today = new Date().toLocaleDateString();
    return `${date.toLocaleDateString() === today ? 'Сегодня,' : date.toLocaleDateString()} в ${date.toLocaleTimeString().slice(0, -3)}`;
  };

  return (
    <div className="card">
      <img src={`${import.meta.env.VITE_URL.slice(0, -3)}/img/posts/${post.postPhotoLink}`} className="card__image" alt="post photo" />
      <div className="card__content">
        <span className="card__title">{post.title}</span>
        <br />
        <br />
        <p>{post.body}</p>
        <br />
        <div className="time">{getFancyDate(post.createdAt)}</div>
      </div>
    </div>
  );
})

export default OrderCard