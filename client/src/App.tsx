import ProfileComponent from './components/AccountComponents/ProfileComponent/ProfileComponent';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import AuthPage from './pages/AuthPage/AuthPage';
import RoomsPage from './pages/RoomsPage/RoomsPage';
import { useEffect } from 'react';
import Navbar from './components/NavbarComponents/Navbar/Navbar';
import PetForm from './components/AccountComponents/PetsComponent/PetForm';
import PetPage from './pages/PetPage/PetPage';
import AccountPage from './pages/AccountPage/AccountPage';
import { useAppDispatch } from './redux/hooks';
import { fetchCheckUser } from './redux/thunkActions';
import PetCard from './components/AccountComponents/PetsComponent/PetCard';
import { fetchCheckAllPets } from './redux/pet/async-action';
import OrderPage from './pages/OrderPage/OrderPage';
import OrderCard from './components/AccountComponents/OrdersComponent/OrderCardList';
import EmptyPet from './components/AccountComponents/PetsComponent/EmptyPet';
import Background from './components/BackgroundComponents/Background';
import Footer from './components/NavbarComponents/Footer/Footer';

function App(): JSX.Element {
  const dispatch = useAppDispatch();
  useEffect(() => {
    void dispatch(fetchCheckUser());
  }, [dispatch]);

  useEffect(() => {
    void dispatch(fetchCheckAllPets());
  }, [dispatch]);

  return (
    <>
      <Background />
      <Navbar />
      <div style={{ position: 'relative' }}>
        <div style={{ minHeight: 'calc(100vh - 130px)' }}>
          <Routes>
            <Route
              index
              element={
                <div className="homePageWrapper">
                  <HomePage />
                </div>
              }
            ></Route>

            <Route path="auth" element={<AuthPage />}></Route>
            <Route path="account" element={<AccountPage />}>
              <Route path="orders" element={<OrderPage />}>
                <Route path=":orderId" element={<OrderCard />} />
              </Route>
              <Route path="profile" element={<ProfileComponent />} />
              <Route path="pets" element={<PetPage />}>
                <Route path="new" element={<PetForm />} />
                <Route path="edit/:petId" element={<PetForm />} />
                <Route path=":petId" element={<PetCard />} />
                <Route path="empty" element={<EmptyPet />} />
              </Route>
            </Route>
            <Route path="rooms" element={<RoomsPage />}></Route>
          </Routes>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default App;
