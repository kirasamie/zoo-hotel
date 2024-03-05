import * as React from "react";
import styles from "./PetForm.module.css";
import {
  Autocomplete,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { fetchAddNewPet } from "../../../redux/thunkActions";

export type InputsPetType = {
  petType: number;
  petName: string;
  petBreed?: string;
  petGender: string;
  petAge: number;
  petIsSprayed: boolean;
  petAbout?: string;
}

export default function PetForm(): JSX.Element {

  const pets = useAppSelector((store) => store.petSlice.pets);
  const dispatch = useAppDispatch();

  const initialStatePet = {
    petType: 0,
    petName: '',
    petGender: '',
    petAge: 0,
    petIsSprayed: false,
  }

  const [inputs, setInputs] = React.useState<InputsPetType>(initialStatePet);


  const handlerChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlerAddNewPet = async (): Promise<void> => {
    void dispatch(fetchAddNewPet(inputs))
    setInputs(initialStatePet);
  }
  console.log(pets);
  return (
    <form className={styles.form}>
      <div>
        <div>
          {/* <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
          /> */}
        </div>
        <br />
        <div>
          <FormControl>
            <FormLabel id="demo-controlled-radio-buttons-group">
              Вид животного
            </FormLabel>
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="petType"
              onChange={(e) => handlerChange(e)}
              // value={value}
              // onChange={handleChange}
            >
              <FormControlLabel
                value={2}
                control={<Radio />}
                label="Собака"
    
              />
              <FormControlLabel  value={1} control={<Radio />} label="Кошка" />
            </RadioGroup>
          </FormControl>
        </div>
        <br />
        <div>
          <TextField
            id="outlined-multiline-flexible"
            label="Кличка"
            name="petName"
            onChange={(e) => handlerChange(e)}
            multiline
            maxRows={4}
          />
        </div>
        <br />
        <div>
          {/* <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={['Pitbull', 'Ovcharka'
            ]}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} onChange={(e) => handlerChange(e)} name="petBreed" label="Порода" />}
          />
        </div> */}
          <TextField
            id="outlined-multiline-flexible"
            name='petBreed'
            onChange={(e) => handlerChange(e)}
            label="Порода"
            multiline
            maxRows={4}
            />
        <br />
        </div>
        <div>
          <FormControl>
            <FormLabel id="demo-controlled-radio-buttons-group">Пол</FormLabel>
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="petGender"
              // value={value}
              onChange={(e) => handlerChange(e)}
            >
              <FormControlLabel
                value="female"
                control={<Radio />}
                label="Женский"
              />
              <FormControlLabel
                value="male"
                control={<Radio />}
                label="Мужской"
              />
            </RadioGroup>
          </FormControl>
        </div>
        <br />
        <div>
          <TextField
            id="outlined-multiline-flexible"
            name='petAge'
            onChange={(e) => handlerChange(e)}
            label="Возраст в годах"
            multiline
            maxRows={4}
          />
        </div>
        <br />
        <div>
          <FormControl>
            <FormLabel id="demo-controlled-radio-buttons-group">
              Стерилизован(-a)
            </FormLabel>
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="petIsSprayed"
              // value={value}
              onChange={(e) => handlerChange(e)}
            >
              <FormControlLabel value={true} control={<Radio />} label="Да" />
              <FormControlLabel value={false} control={<Radio />} label="Нет" />
            </RadioGroup>
          </FormControl>
        </div>
        <br />
        <div>
          <TextField
            multiline
            id="outlined-basic"
            label="Расскажите о питомце"
            variant="outlined"
            onChange={(e) => handlerChange(e)}
            name='petAbout'
            rows={4}
          />
        </div>
      </div>
      <br />
      <Button onClick={() => void handlerAddNewPet()} variant="contained">Создать карточку питомца</Button>
    </form>
  );
}
