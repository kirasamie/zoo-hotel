import * as React from "react";
import styles from "./PetForm.module.css";
import {
  // Autocomplete,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { fetchAddNewPet, fetchEditPet } from "../../../redux/pet/async-action";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

export type InputsPetType = {
  petType: number;
  petName: string;
  petBreed?: string;
  petGender: string;
  petAge: number;
  petIsSprayed: boolean;
  petAbout?: string;
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
  };

  const [inputs, setInputs] = React.useState<InputsPetType>(initialStatePet);

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
      navigate(`/account/pets/${pet.id}`)
    }
  };

  const handlerAddNewPet = async (): Promise<void> => {
    void dispatch(fetchAddNewPet(inputs));
    setInputs(initialStatePet);
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
            value={inputs.petAge}
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
