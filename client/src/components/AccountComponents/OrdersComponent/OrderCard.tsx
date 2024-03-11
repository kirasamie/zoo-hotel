import React, { ChangeEvent, useEffect, useState } from 'react';
import { PostType } from '../../../redux/posts/postsSlice';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { Button, TextField } from '@mui/material';
import styles from './OrderCard.module.css';
import { fetchAddNewComment, fetchCheckAllComments } from '../../../redux/comment/async-action';
import CardGlassWrapper from '../../GlassWrapper/CardGlassWrapper';
import StyledTextfield from '../../GlassWrapper/StyledTextfield';
import StyledButton from '../../GlassWrapper/StyledButton';

type PostPropsType = {
  post: PostType;
};

export type InputType = {
  body: string;
};

const OrderCard = React.memo(({ post }: PostPropsType) => {
  const dispatch = useAppDispatch();
  const comments = useAppSelector((store) => store.commentSlice.comments);
  const [filteredComments, setFilteredComments] = useState([]);
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
    return `${date.toLocaleDateString() === today ? 'Сегодня,' : date.toLocaleDateString()} в ${date.toLocaleTimeString().slice(0, -3)}`;
  };

  useEffect(() => {
    // void dispatch(fetchCheckAllComments());
    setFilteredComments(comments.filter((comment) => comment.postId === post.id));
  }, [comments, post.id]);

  return (
    <>
      <CardGlassWrapper>
        <div className={styles.postInfo}>
          <h3 className={styles.postHeader}>{post.title}</h3>
          <div className={styles.postImageWrapper}>
            <img className={styles.postImage} src={`${import.meta.env.VITE_URL.slice(0, -3)}/img/posts/${post.postPhotoLink}`} alt="post photo" />
          </div>
          <p className={styles.postBody}>{post.body}</p>
          <div className={styles.postFooter}>
            <div className="time">{getFancyDate(post.createdAt)}</div>
            <div>
              Работник:{' '}
              <span style={{ color: 'white' }}>
                {post?.User?.firstName} {post?.User?.lastName}
              </span>
            </div>
          </div>
        </div>

        <div className={styles.horizontalDivider}></div>

        <ul className={styles.chat}>
          {filteredComments.length ? (
            filteredComments?.map((comment) => (
              <li key={comment.id} className={user.id === comment.userId ? styles.chatMessageWrapperRight : styles.chatMessageWrapperLeft}>
                <div className={user.id === comment.userId ? styles.chatMessageRight : styles.chatMessageLeft}>
                  <div className={styles.userAvatarWrapper}>
                    <img className={styles.userAvatar} src={`${import.meta.env.VITE_URL.slice(0, -3)}img/avatars/${comment.User?.avatar}`} alt="logotype" />
                  </div>
                  <div className={styles.chatMessage}>
                    <span data-worker={`${comment.User.isWorker}`} className={`${user.id === comment.userId ? styles.chatUserNameRight : styles.chatUserNameLeft} ${styles.chatUserName}`}>
                      {comment?.User?.firstName} {comment?.User?.lastName}
                    </span>
                    <span className={user.id === comment.userId ? styles.chatContentRight : styles.chatContentLeft}>{comment.body}</span>
                  </div>
                </div>
              </li>
            ))
          ) : (
            <h3 className={styles.noCommentsHeader}>Комментариев пока нет. Оставьте первый!</h3>
          )}
        </ul>

        <div className={styles.horizontalDivider}></div>

        <div className={styles.commentForm}>
            <StyledTextfield label="Ваш комментарий" onChange={(e: HTMLInputElement) => void handlerChange(e)} name="body" value={input.body}/>
            <StyledButton onClick={() => void handlerAddComment()}>Отправить</StyledButton>
        </div>
      </CardGlassWrapper>
    </>
  );
});

export default OrderCard;
