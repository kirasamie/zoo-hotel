import { Button, Modal, TextField } from "@mui/material";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { UserEditType } from "../../../models/User";
import { useAppDispatch } from "../../../redux/hooks";
import { fetchEditUser } from "../../../redux/thunkActions";
import { UserType } from "../../../redux/userSlice";
import styles from "./EditModal.module.css";

export default function EditModal({
  user,
  setIsOpenModal,
}: {
  user: UserType;
  setIsOpenModal: Dispatch<SetStateAction<boolean>>;
}) {
  const initialStateUser = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  };

  const [inputs, setInputs] = useState<UserEditType>(initialStateUser);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (user) {
      setInputs({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        phone: user.phone || "",
      });
    } else {
      setInputs(initialStateUser);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const handlerChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlerEditUser = async (): Promise<void> => {
    void dispatch(fetchEditUser(inputs));
    setIsOpenModal(false);
  };
  const handleClose = () => {
    setIsOpenModal(false);
  };

  return (
    <Modal
      className={styles.modalContainer}
      open
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className={styles.modal}>
        <h2 className={styles.input}>Редактирование</h2>
        <div className={styles.inputModal}>
          <TextField
            className={styles.input}
            fullWidth
            id="outlined-multiline-flexible"
            name="firstName"
            value={inputs.firstName}
            onChange={(e) => handlerChange(e)}
            label="Имя"
            multiline
            maxRows={4}
          />
          <TextField
            className={styles.input}
            fullWidth
            id="outlined-multiline-flexible"
            name="lastName"
            value={inputs.lastName}
            onChange={(e) => handlerChange(e)}
            label="Фамилия"
            multiline
            maxRows={4}
          />
          <TextField
            className={styles.input}
            fullWidth
            id="outlined-multiline-flexible"
            name="email"
            value={inputs.email}
            onChange={(e) => handlerChange(e)}
            label="Email"
            multiline
            maxRows={4}
          />
          <TextField
            className={styles.input}
            fullWidth
            id="outlined-multiline-flexible"
            name="phone"
            value={inputs.phone}
            onChange={(e) => handlerChange(e)}
            label="Контактный телефон"
            multiline
            maxRows={4}
          />
        </div>

        <Button onClick={handlerEditUser}>Cохранить</Button>
      </div>
    </Modal>
  );
}
