import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import AuthPage from './pages/AuthPage/AuthPage';
import { useEffect } from 'react';
import axios from 'axios';
import Navbar from './components/NavbarComponents/Navbar/Navbar';

function App() {

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_URL}/user/checkSession`, {withCredentials: true})
    .then((response) => console.log(response.data))
  }, [])
  return (
    <>
      <div className="SOMEWRAPPER!!!!!!!!!!!!!">
        <Navbar />
        <h1>header с навбаром</h1>
      </div>
      <div className="SOMEWRAPPER!!!!!!!!!!!!!">
        <h1>роуты</h1>
        <Routes>
          <Route index element={<HomePage />}></Route>

          <Route path="auth" element={<AuthPage />}></Route>

          <Route path="account" element={<h2>account page</h2>}>
            {/* тут должно быть условие - клиент или работник (админ) */}
            <Route path="chat" element={<h2>chat page</h2>}>
              {/* NESTED с комнатами */}
            </Route>
            <Route path="orders" element={<h2>orders page</h2>} />
            <Route path="profile" element={<h2>profile page</h2>} />
            <Route path="pets" element={<h2>pets page</h2>}>
              <Route path=":petId" element={<h2>profile page</h2>} />
            </Route>
          </Route>

          <Route path="rooms" element={<h2>huge story ROOMS WITH PAYMENT</h2>}></Route>

          <Route path="another" element={<h2>another page</h2>}></Route>
        </Routes>
      </div>
      <div className="SOMEWRAPPER!!!!!!!!!!!!!">
        <h1>Футер</h1>
      </div>
    </>
  );
}

export default App;
