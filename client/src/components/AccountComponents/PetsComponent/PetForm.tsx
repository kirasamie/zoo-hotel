import * as React from "react";
import styles from "./PetForm.module.css";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  fetchAddNewPet,
  fetchCheckAllPets,
  fetchEditPet,
} from "../../../redux/pet/async-action";
import { useNavigate, useParams } from "react-router-dom";
import { ChangeEvent, useEffect, useState } from "react";
import axios from "axios";
import {
  // Autocomplete,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  styled,
  Button,
} from "@mui/material";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
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

  const pet = useAppSelector((store) =>
    store.petSlice.pets.find((pet) => params.petId && pet.id === +params.petId)
  );

  const dispatch = useAppDispatch();
  const initialStatePet = {
    petType: 0,
    petName: "",
    petBreed: "",
    petGender: "",
    petAge: 0,
    petIsSprayed: false,
    petAbout: "",
    linkImages: [],
  };

  const [inputs, setInputs] = React.useState<InputsPetType>(initialStatePet);
  const [selectedImages, setSelectedImages] = useState([]);
  const [avatarPet, setAvatarPet] = useState([]);

  const onSelectFile = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    const selectedFilesArray = Array.from(selectedFiles);

    const imagesArray = selectedFilesArray.map((file) => {
      const obj = { file: {}, blob: "" };
      obj.file = file;
      obj.blob = URL.createObjectURL(file);
      setAvatarPet((prev) => [...prev, obj]);
      return obj.blob;
    });

    setSelectedImages((previousImages) => previousImages.concat(imagesArray));
    e.target.value = "";
  };
  if (avatarPet.length >= 4 && selectedImages.length >= 4) {
    setAvatarPet((prev) => prev.slice(0, 3));
    setSelectedImages((prev) => prev.slice(0, 3));
  }

  const sendFiles = async (petId: number) => {
    const data = new FormData();
    console.log(avatarPet);

    if (avatarPet) {
      const arrPetsImages = avatarPet.map((avatar) => {
        return avatar.file;
      });
      arrPetsImages.forEach((arr) => {
        data.append("pets", arr);
      });

      const response = await axios.post(
        `${import.meta.env.VITE_URL}/image/pet/${petId}`,
        data,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );
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

  const handlerChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
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
      if (res.meta.requestStatus === "fulfilled") {
        sendFiles(res.payload.id);
        void dispatch(fetchCheckAllPets()).then(() => {
          navigate(`/account/pets/${res.payload.id}`);
        });
      }
    });
    setInputs(initialStatePet);
    setSelectedImages([]);
  };
  return (
    <form className={styles.form}>
      {pet ? (
        <h2>Редактирование карточки {pet?.petName}</h2>
      ) : (
        <h2>Добавление карточки питомца</h2>
      )}
      <div className={styles.inputsContainer}>
        <div className={styles.input}>
          <FormControl>
            <FormLabel id="demo-controlled-radio-buttons-group">
              Вид животного
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="petType"
              value={inputs.petType}
              onChange={(e) => handlerChange(e)}
            >
              <FormControlLabel value={2} control={<Radio />} label="Собака" />
              <FormControlLabel value={1} control={<Radio />} label="Кошка" />
            </RadioGroup>
          </FormControl>
        </div>
        <div className={styles.input}>
          <TextField
            fullWidth
            id="outlined-multiline-flexible"
            label="Кличка"
            name="petName"
            value={inputs.petName}
            onChange={(e) => handlerChange(e)}
            multiline
            maxRows={4}
          />
        </div>
        <div className={styles.input}>
          <TextField
            fullWidth
            id="outlined-multiline-flexible"
            name="petBreed"
            value={inputs.petBreed}
            onChange={(e) => handlerChange(e)}
            label="Порода"
            multiline
            maxRows={4}
          />
        </div>
        <div className={styles.input}>
          <FormControl>
            <FormLabel id="demo-controlled-radio-buttons-group">Пол</FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="petGender"
              value={inputs.petGender}
              onChange={(e) => handlerChange(e)}
            >
              <FormControlLabel value="Ж" control={<Radio />} label="Женский" />
              <FormControlLabel value="М" control={<Radio />} label="Мужской" />
            </RadioGroup>
          </FormControl>
        </div>
        <div className={styles.input}>
          <TextField
            fullWidth
            id="outlined-multiline-flexible"
            name="petAge"
            value={inputs.petAge === 0 ? "" : inputs.petAge}
            onChange={(e) => handlerChange(e)}
            label="Возраст в годах"
            multiline
            maxRows={4}
          />
        </div>
        <div className={styles.input}>
          <FormControl>
            <FormLabel id="demo-controlled-radio-buttons-group">
              Стерилизован(-a)
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="petIsSprayed"
              value={inputs.petIsSprayed}
              onChange={(e) => handlerChange(e)}
            >
              <FormControlLabel value={true} control={<Radio />} label="Да" />
              <FormControlLabel value={false} control={<Radio />} label="Нет" />
            </RadioGroup>
          </FormControl>
        </div>
        <div className={styles.input}>
          <TextField
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
        <div className={styles.input}></div>
        <Button
          component="label"
          role={undefined}
          variant="contained"
          tabIndex={-1}
        >
          Загрузить фото питомца (до 3х фото)
          <VisuallyHiddenInput
            type="file"
            name="pets"
            multiple
            accept="image/png, image/jpeg, image/jpg"
            onChange={(e: ChangeEvent<HTMLInputElement>) => onSelectFile(e)}
          />
        </Button>

        <div className="images">
          {selectedImages &&
            selectedImages.map((image, index) => {
              return index < 3 ? (
                <div key={image} className="image">
                  <img src={image} height="200" alt="upload" />
                  <button onClick={() => deleteHandler(image)}>
                    delete image
                  </button>
                  <p>{index + 1}</p>
                </div>
              ) : (
                <p style={{ backgroundColor: "red" }}>
                  ДО 3х КАРТИНОК,БОЛЬШЕ НИЗЯ!
                </p>
              );
            })}
        </div>
      </div>
      {pet ? (
        <Button onClick={() => void handlerEditPet()} variant="contained">
          Сохранить
        </Button>
      ) : (
        <Button onClick={() => void handlerAddNewPet()} variant="contained">
          Создать
        </Button>
      )}
    </form>
  );
}
