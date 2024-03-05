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

export default function PetForm() {
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
              name="controlled-radio-buttons-group"
              // value={value}
              // onChange={handleChange}
            >
              <FormControlLabel
                value="dog"
                control={<Radio />}
                label="Собака"
              />
              <FormControlLabel value="cat" control={<Radio />} label="Кошка" />
            </RadioGroup>
          </FormControl>
        </div>
        <br />
        <div>
          <TextField
            id="outlined-multiline-flexible"
            label="Кличка"
            multiline
            maxRows={4}
          />
        </div>
        <br />
        <div>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={[
              { label: "Pitbul", id: 1 },
              { label: "Ovcharka", id: 2 },
            ]}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Порода" />}
          />
        </div>
        <br />
        <div>
          <FormControl>
            <FormLabel id="demo-controlled-radio-buttons-group">Пол</FormLabel>
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              // value={value}
              // onChange={handleChange}
            >
              <FormControlLabel
                value="female"
                control={<Radio />}
                label="Мужской"
              />
              <FormControlLabel
                value="male"
                control={<Radio />}
                label="Женский"
              />
            </RadioGroup>
          </FormControl>
        </div>
        <br />
        <div>
          <TextField
            id="outlined-multiline-flexible"
            label="Возраст"
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
              name="controlled-radio-buttons-group"
              // value={value}
              // onChange={handleChange}
            >
              <FormControlLabel value="yes" control={<Radio />} label="Да" />
              <FormControlLabel value="no" control={<Radio />} label="Нет" />
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
            rows={4}
          />
        </div>
      </div>
      <br />
      <Button variant="contained">Создать карточку питомца</Button>
    </form>
  );
}
