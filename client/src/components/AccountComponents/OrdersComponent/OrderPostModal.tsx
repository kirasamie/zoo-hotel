import { ChangeEvent, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import axios from 'axios';
import { fetchGetPostsByOrder } from '../../../redux/posts/postsThunkActions';
import { Modal, styled } from '@mui/material';
import StyledTextfield from '../../GlassWrapper/StyledTextfield';
import StyledButton from '../../GlassWrapper/StyledButton';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import styles from './OrderPostModal.module.css';
import GlassWrapper from '../../GlassWrapper/GlassWrapper';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

type ModalPropsType = {
  open: boolean;
  handleClose: () => void;
  orderId: string;
};

export default function OrderPostModal({ open, handleClose, orderId }: ModalPropsType) {
  const user = useAppSelector((store) => store.userSlice.info);
  const dispatch = useAppDispatch();
  const [inputs, setInputs] = useState({
    title: '',
    body: '',
    orderId: 0,
    workerId: 0,
  });
  const [postImage, setPostImage] = useState<File | null>();

  const sendFile = async (postId: number) => {
    if (postImage) {
      const data = new FormData();
      data.append('postImage', postImage);
      const response = await axios.post(`${import.meta.env.VITE_URL}/posts/image/${postId}`, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
      });
      if (response.status === 200) {
        dispatch(fetchGetPostsByOrder(Number(orderId)));
        handleClose();
      }
    }
  };

  const changeHandler = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setInputs((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
      orderId: Number(orderId),
      workerId: user.id,
    }));
  };

  const uploadHandler = async () => {
    const response = await axios.post(`${import.meta.env.VITE_URL}/posts/`, inputs, { withCredentials: true });
    if (response.status === 200) {
      sendFile(response.data.id);
      setInputs({ title: '', body: '', orderId: 0, workerId: 0 });
    }
  };

  return (
    <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
      <GlassWrapper width="40vw" className={styles.modalWindow}>
        <div className={styles.modalForm}>
          <StyledTextfield name="title" value={inputs.title} label="Заголовок" fullWidth onChange={changeHandler} />
          <StyledTextfield name="body" value={inputs.body} label="Описание" maxRows={15} multiline fullWidth onChange={changeHandler} />
          <div className={styles.formWrapper}>
            <StyledTextfield disabled type="text" name="avatar" value={postImage?.name || 'Файл не выбран'} />
            <StyledButton sx={{ width: '240px' }} component="label" role={undefined} tabIndex={-1} startIcon={<CloudUploadIcon />} disableElevation>
              Загрузить фото
              <VisuallyHiddenInput
                type="file"
                name="avatar"
                accept="image/png, image/jpeg, image/jpg"
                onChange={(e: ChangeEvent<HTMLInputElement>) => void setPostImage(e.target.files ? e.target.files[0] : null)}
              />
            </StyledButton>
          </div>
          <StyledButton variant="contained" onClick={() => void uploadHandler()}>
            Опубликовать
          </StyledButton>
        </div>
      </GlassWrapper>
    </Modal>
  );
}
