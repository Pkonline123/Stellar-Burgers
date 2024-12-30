import React, { useEffect } from 'react';
import Header from '../header-item/header';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import HomePage from '../../pages/home';
import Login from '../../pages/login';
import Register from '../../pages/register';
import Profile from '../../pages/profile';
import ForgotPassword from '../../pages/forgot-password';
import ResetPassword from '../../pages/reset-password';
import IngredientPage from '../../pages/ingredient';
import { Modal } from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { setCurentIngrident } from '../../services/ingredients/reducer';
import { fetchIngredients } from '../../services/ingredients/thunk';
import OrderFeed from '../../pages/order-feed';
import OrderPage from '../order/order-page';
import { getCurrentOrder } from '../../services/currentOrder/thunk';
import OrderCardDetails from '../order/order-card-details';
import { ProtectedRoute } from '../protected-route/protected-route';
import { dropCurentOrder } from '../../services/currentOrder/reducer';

type LocationState = {
  backgroundLocation?: Location;
};

export default function App() {
  const location = useLocation();
  const state = location.state as LocationState;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const id = location.pathname.startsWith("/feed") ? location.pathname.split('/')[2] :
    location.pathname.startsWith('/ingredients') ? location.pathname.split('/')[2] : location.pathname.split('/')[3];

  const ingredient = useAppSelector((state) => state.ingredients.curentIngrident);
  const allIngridents = useAppSelector((state) => state.ingredients.items);
  const currentOrder = useAppSelector((state) => state.currentOrder.orders);

  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);

  useEffect(() => {
    dispatch(dropCurentOrder());
    if (id && ingredient) {
      dispatch(getCurrentOrder(id));
    } else if (id && !ingredient) {
      const foundIngredient = allIngridents.find((item) => item._id === id);
      if (foundIngredient) {
        dispatch(setCurentIngrident(foundIngredient));
      } else {
        dispatch(getCurrentOrder(id));
      }
    }

  }, [id, ingredient, dispatch, allIngridents]);


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
        <Route path='/profile/orders/:id'
          element={<ProtectedRoute element={<OrderPage />} />}
        />
        <Route path='/feed' element={<OrderFeed />} />
        <Route path='/feed/:id' element={<OrderPage />} />
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
          <Route
            path="/profile/orders/:id"
            element={
              <Modal title="Детали заказа" onClose={() => navigate(-1)}>
                {currentOrder ? (
                  <OrderCardDetails order={currentOrder} />
                ) : (
                  <p>Заказ не найден</p>
                )}
              </Modal>
            }
          />
          <Route
            path="/feed/:id"
            element={
              <Modal title="Детали заказа" onClose={() => navigate(-1)}>
                {currentOrder ? (
                  <OrderCardDetails order={currentOrder} />
                ) : (
                  <p>Заказ не найден</p>
                )}
              </Modal>
            }
          />
        </Routes>
      )}
    </>
  );
}