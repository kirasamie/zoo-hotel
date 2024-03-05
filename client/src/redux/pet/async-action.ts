import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { API } from "../../constants/api"
import { PetResponseType } from "../../models/Pet"

export const getPets = createAsyncThunk('pets/all', async () => {
  const response = await axios.get<PetResponseType>(API+'/todos', {withCredentials: true})
  return [
    {
      id: 1,
      petUserId: 1,
      petType: 1,
      petName: "Rocky",
      petBreed: "Pitbul",
      petGender: "Man",
      petAge: 4,
      petIsSprayed: true,
      petAbout: "Следить, чтобы не чесал ухо, есть аллергия на говядину, дома не гадит",
      petPhoto: "Photo",
    },
    {
      id: 1,
      petUserId: 1,
      petType: 1,
      petName: "Rocky",
      petBreed: "Pitbul",
      petGender: "Man",
      petAge: 4,
      petIsSprayed: true,
      petAbout: "Следить, чтобы не чесал ухо, есть аллергия на говядину, дома не гади",
      petPhoto: "Photo",
    },
    {
      id: 1,
      petUserId: 1,
      petType: 1,
      petName: "Rocky",
      petBreed: "Pitbul",
      petGender: "Man",
      petAge: 4,
      petIsSprayed: true,
      petAbout: "Следить, чтобы не чесал ухо, есть аллергия на говядину, дома не гади",
      petPhoto: "Photo",
    },
  ];
})