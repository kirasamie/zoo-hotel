import * as React from 'react';
import styles from './PetForm.module.css';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { fetchAddNewPet, fetchCheckAllPets, fetchEditPet } from '../../../redux/pet/async-action';
import { useNavigate, useParams } from 'react-router-dom';
import { ChangeEvent, useEffect, useState } from 'react';
import axios from 'axios';
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, styled } from '@mui/material';

import StyledTextfield from '../../GlassWrapper/StyledTextfield';
import StyledButton from '../../GlassWrapper/StyledButton';

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
const OrangeRadio = styled(Radio)({
  '&.Mui-checked': {
    color: 'orange',
  },
  '&.MuiRadio-colorPrimary': {
    color: 'orange',
  },
});

export type InputsPetType = {
  petType: number;
  petName: string;
  petBreed?: string;
  petGender: string;
  petAge: number;
  petIsSprayed: boolean;
  petAbout?: string;
  linkImages?: string[];
};

export default function PetForm(): JSX.Element {
  const navigate = useNavigate();
  const params = useParams();

  const pet = useAppSelector((store) => store.petSlice.pets.find((pet) => params.petId && pet.id === +params.petId));

  const dispatch = useAppDispatch();
  const initialStatePet = {
    petType: 0,
    petName: '',
    petBreed: '',
    petGender: '',
    petAge: 0,
    petIsSprayed: false,
    petAbout: '',
    linkImages: [],
  };

  const [inputs, setInputs] = React.useState<InputsPetType>(initialStatePet);
  const [selectedImages, setSelectedImages] = useState([]);
  const [avatarPet, setAvatarPet] = useState([]);

  const onSelectFile = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    const selectedFilesArray = Array.from(selectedFiles);

    const imagesArray = selectedFilesArray.map((file) => {
      const obj = { file: {}, blob: '' };
      obj.file = file;
      obj.blob = URL.createObjectURL(file);
      setAvatarPet((prev) => [...prev, obj]);
      return obj.blob;
    });

    setSelectedImages((previousImages) => previousImages.concat(imagesArray));
    e.target.value = '';
  };
  if (avatarPet.length >= 4 && selectedImages.length >= 4) {
    setAvatarPet((prev) => prev.slice(0, 3));
    setSelectedImages((prev) => prev.slice(0, 3));
  }

  const sendFiles = async (petId: number) => {
    const data = new FormData();

    if (avatarPet) {
      const arrPetsImages = avatarPet.map((avatar) => {
        return avatar?.file;
      });
      arrPetsImages.forEach((arr) => {
        data.append('pets', arr);
      });

      const response = await axios.post(`${import.meta.env.VITE_URL}/image/pet/${petId}`, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
      });
      if (response.data.msg) {
        void dispatch(fetchCheckAllPets());
      }
    }
  };

  function deleteHandler(image) {
    setSelectedImages(selectedImages.filter((e) => e !== image));
    setAvatarPet(avatarPet.filter((e) => e.blob !== image));
    URL.revokeObjectURL(image);
  }

  useEffect(() => {
    if (pet) {
      setInputs(pet);
    } else {
      setInputs(initialStatePet);
    }
  }, [pet]);

  const handlerChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlerEditPet = async (): Promise<void> => {
    if (pet) {
      void dispatch(fetchEditPet({ id: pet?.id, inputs }));
      setInputs(initialStatePet);
      navigate(`/account/pets/${pet.id}`);
    }
  };

  const handlerAddNewPet = async (): Promise<void> => {
    void dispatch(fetchAddNewPet(inputs)).then((res) => {
      if (res.meta.requestStatus === 'fulfilled') {
        void sendFiles(res.payload.id).then(() => {
          navigate(`/account/pets/${res.payload.id}`);
        });
        void dispatch(fetchCheckAllPets())
      }
    });
    setInputs(initialStatePet);
    setSelectedImages([]);
    setAvatarPet([]);
  };
  return (
    <form className={styles.form}>
      {pet ? <h2 style={{ color: 'orange' }}>Редактирование карточки {pet?.petName}</h2> : <h2 style={{ color: 'orange' }}>Добавление карточки питомца</h2>}
      <div className={styles.inputsContainer}>
        <div className={styles.input}>
          <FormControl>
            <FormLabel style={{ color: 'orange' }} id="demo-controlled-radio-buttons-group">
              Вид животного
            </FormLabel>
            <RadioGroup row aria-labelledby="demo-controlled-radio-buttons-group" name="petType" value={inputs.petType} onChange={(e) => handlerChange(e)}>
              <FormControlLabel value={2} control={<OrangeRadio />} label={<span style={{ color: 'orange' }}>Собака</span>} />
              <FormControlLabel value={1} control={<OrangeRadio />} label={<span style={{ color: 'orange' }}>Кошка</span>} />
            </RadioGroup>
          </FormControl>
        </div>
        <div className={styles.input}>
          <StyledTextfield fullWidth id="outlined-multiline-flexible" label="Кличка" name="petName" value={inputs.petName} onChange={(e) => handlerChange(e)} multiline maxRows={4} />
        </div>
        <div className={styles.input}>
          <StyledTextfield fullWidth id="outlined-multiline-flexible" name="petBreed" value={inputs.petBreed} onChange={(e) => handlerChange(e)} label="Порода" multiline maxRows={4} />
        </div>
        <div className={styles.input}>
          <FormControl>
            <FormLabel style={{ color: 'orange' }} id="demo-controlled-radio-buttons-group">
              Пол
            </FormLabel>
            <RadioGroup row aria-labelledby="demo-controlled-radio-buttons-group" name="petGender" value={inputs.petGender} onChange={(e) => handlerChange(e)}>
              <FormControlLabel value="Ж" control={<OrangeRadio />} label={<span style={{ color: 'orange' }}>Женский</span>} />
              <FormControlLabel value="М" control={<OrangeRadio />} label={<span style={{ color: 'orange' }}>Мужской</span>} />
            </RadioGroup>
          </FormControl>
        </div>
        <div className={styles.input}>
          <StyledTextfield
            fullWidth
            id="outlined-multiline-flexible"
            name="petAge"
            value={inputs.petAge === 0 ? '' : inputs.petAge}
            onChange={(e) => handlerChange(e)}
            label="Возраст в годах"
            multiline
            maxRows={4}
          />
        </div>
        <div className={styles.input}>
          <FormControl>
            <FormLabel style={{ color: 'orange' }} id="demo-controlled-radio-buttons-group">
              Стерилизован(-a)
            </FormLabel>
            <RadioGroup row aria-labelledby="demo-controlled-radio-buttons-group" name="petIsSprayed" value={inputs.petIsSprayed} onChange={(e) => handlerChange(e)}>
              <FormControlLabel value={true} control={<OrangeRadio />} label={<span style={{ color: 'orange' }}>Да</span>} />
              <FormControlLabel value={false} control={<OrangeRadio />} label={<span style={{ color: 'orange' }}>Нет</span>} />
            </RadioGroup>
          </FormControl>
        </div>
        <div className={styles.input}>
          <StyledTextfield
            fullWidth
            multiline
            id="outlined-basic"
            label="Расскажите о питомце"
            variant="outlined"
            value={inputs.petAbout}
            onChange={(e) => handlerChange(e)}
            name="petAbout"
            rows={4}
          />
        </div>
        <div className={styles.uploadInput}>
          <StyledButton component="label" role={undefined} variant="contained" tabIndex={-1}>
            Загрузить фото питомца (до 3х фото)
            <VisuallyHiddenInput type="file" name="pets" multiple accept="image/png, image/jpeg, image/jpg" onChange={(e: ChangeEvent<HTMLInputElement>) => onSelectFile(e)} />
          </StyledButton>
        </div>
        <div className={styles.uploadedImagesWrapper}>
          {selectedImages &&
            selectedImages.map((image, index) => {
              return index < 3 ? (
                <div key={image} className={styles.uploadedImageWrapper}>
                  <img src={image} height="200" alt="upload" className={styles.uploadedImage} />
                  <button onClick={() => deleteHandler(image)} className={styles.uploadedImageDeleteBtn}>
                    X
                  </button>
                  <p>{index + 1}</p>
                </div>
              ) : (
                <p style={{ backgroundColor: 'red' }}>ДО 3х КАРТИНОК,БОЛЬШЕ НИЗЯ!</p>
              );
            })}
        </div>
      </div>
      {pet ? (
        <StyledButton onClick={() => void handlerEditPet()} variant="contained">
          Сохранить
        </StyledButton>
      ) : (
        <StyledButton onClick={() => void handlerAddNewPet()} variant="contained">
          Создать
        </StyledButton>
      )}
    </form>
  );
}
