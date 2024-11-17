import React, { useEffect } from 'react';
import Header from '../header-item/header';
import { Routes, Route, useLocation, useParams, useNavigate } from 'react-router-dom';
import HomePage from '../../pages/home';
import Login from '../../pages/login';
import Register from '../../pages/register';
import Profile from '../../pages/profile';
import ForgotPassword from '../../pages/forgot-password';
import ResetPassword from '../../pages/reset-password';
import { ProtectedRoute } from '../protected-route/protecred-route';
import IngredientPage from '../../pages/ingredient';
import { Modal } from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { setCurentIngrident } from '../../services/ingredients/reducer';
import { fetchIngredients } from '../../services/ingredients/thunk';

type LocationState = {
  backgroundLocation?: Location;
};

export default function App() {
  const location = useLocation();
  const state = location.state as LocationState;
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const ingredient = useAppSelector((state) => state.ingredients.curentIngrident);

  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);

  useEffect(() => {
    if (id && ingredient) {
      console.log(ingredient + "dispatsh");
      dispatch(setCurentIngrident(ingredient));
    }
  }, [id, ingredient, dispatch]);

  return (
    <>
      <Header />
      <Routes location={state?.backgroundLocation || location}>
        <Route path="/" element={<HomePage />} />
        <Route path="/ingredients/:id" element={<IngredientPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/resetPassword" element={<ResetPassword />} />
        <Route
          path="/profile/*"
          element={<ProtectedRoute element={<Profile />} />}
        />
      </Routes>

      {state?.backgroundLocation && (
        <Routes>
          <Route
            path="/ingredients/:id"
            element={
              <Modal title="Детали ингредиента" onClose={() => navigate(-1)}>
                {ingredient ? (
                  <IngredientDetails {...ingredient} />
                ) : (
                  <p>Ингредиент не найден</p>
                )}
              </Modal>
            }
          />
        </Routes>
      )}
    </>
  );
}