import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import AuthPage from "./pages/AuthPage/AuthPage";
import RoomsPage from "./pages/RoomsPage/RoomsPage";
import { useEffect } from "react";
import Navbar from "./components/NavbarComponents/Navbar/Navbar";
import PetForm from "./components/AccountComponents/PetsComponent/PetForm";
import PetPage from "./pages/PetPage/PetPage";
import AccountPage from "./pages/AccountPage/AccountPage";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { fetchCheckUser } from "./redux/thunkActions";
import PetCard from "./components/AccountComponents/PetsComponent/PetCard";
import { fetchCheckAllPets } from "./redux/pet/async-action";

function App(): JSX.Element {
  const dispatch = useAppDispatch();
  const user = useAppSelector((store) => store.userSlice.info);
  console.log(user);
  useEffect(() => {
   void dispatch(fetchCheckUser());
   if (user && user.id > 0) {
     void dispatch(fetchCheckAllPets());
   }
  }, [dispatch]);

  return (
    <>
      <div className="SOMEWRAPPER!!!!!!!!!!!!!">
        <Navbar />
        {/* <h1>header с навбаром</h1> */}
      </div>
      <div
        style={{ position: "relative" }}
        className="SOMEWRAPPER!!!!!!!!!!!!!"
      >
        {/* <h1>роуты</h1> */}
        <Routes>
          <Route index element={<HomePage />}></Route>

          <Route path="auth" element={<AuthPage />}></Route>

          <Route path="account" element={<AccountPage />}>
            {/* тут должно быть условие - клиент или работник (админ) */}
            <Route path="chat" element={<h2>chat page</h2>}>
              {/* NESTED с комнатами */}
            </Route>
            {/* <Route path="orders" element={<h2>orders page</h2>} />
            <Route path="profile" element={<h2>profile page</h2>} /> */}
            <Route path="pets" element={<PetPage />}>
              <Route path="new" element={<PetForm />} />
              <Route path="edit/:petId" element={<PetForm />} />
              <Route path=":petId" element={<PetCard />} />
            </Route>
          </Route>

          <Route path="rooms" element={<RoomsPage />}></Route>

          <Route path="another" element={<h2>another page</h2>}></Route>
        </Routes>
      </div>
      <div className="SOMEWRAPPER!!!!!!!!!!!!!">{/* <h1>Футер</h1> */}</div>
    </>
  );
}

export default App;
