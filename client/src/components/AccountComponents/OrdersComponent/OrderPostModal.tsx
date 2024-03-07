import { TextField, Box, Button, Modal, styled } from '@mui/material';
import { ChangeEvent, useState } from 'react';
import { useAppSelector } from '../../../redux/hooks';
import axios from 'axios';

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '70%',
  bgcolor: 'background.paper',
  borderRadius: '4px',
  boxShadow: 24,
  p: 4,
};

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
  const [inputs, setInputs] = useState({ title: '', body: '', orderId: 0, workerId: 0 });
  const [postImage, setPostImage] = useState();

  const sendFile = async (postId: number) => {
    if (postImage) {
      const data = new FormData();
      data.append('postImage', postImage);
      const response = await axios.post(`${import.meta.env.VITE_URL}/posts/image/${postId}`, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
      });
      if (response.status === 200) {
        handleClose();
      }
    }
  };

  const changeHandler = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setInputs((prev) => ({ ...prev, [event.target.name]: event.target.value, orderId: Number(orderId), workerId: user.id }));
  };

  const uploadHandler = async () => {
    const response = await axios.post(`${import.meta.env.VITE_URL}/posts/`, inputs, { withCredentials: true });
    if (response.status === 200) {
        sendFile(response.data.id)
    }
  };

  return (
    <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
      <Box sx={style}>
        <TextField name="title" value={inputs.title} label="Заголовок" fullWidth onChange={changeHandler} />
        <TextField name="body" value={inputs.body} label="Описание" maxRows={15} multiline fullWidth onChange={changeHandler} />

        <Button component="label" role={undefined} variant="contained" tabIndex={-1} fullWidth>
          Загрузить фотографию
          <VisuallyHiddenInput type="file" name="avatar" accept="image/png, image/jpeg, image/jpg" onChange={(e: ChangeEvent<HTMLInputElement>) => void setPostImage(e.target.files[0])} />
        </Button>

        <Button variant="contained" onClick={() => void uploadHandler()}>
          Опубликовать
        </Button>
      </Box>
    </Modal>
  );
}
