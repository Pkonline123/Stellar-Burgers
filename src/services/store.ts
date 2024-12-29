import { combineReducers, configureStore } from '@reduxjs/toolkit'
import ingredientsReduser from "./ingredients/reducer"
import constructorBurgerReduser from "./constructor/reducer"
import orderReduser from "./order/reducer"
import userReduser from "./user/reducer"
import wsReducerOrderAll from "./wsOrdersAll/reducer"
import wsReducerPersonOrders from "./wsPersonOrders/reducer"
import currentOrder from "./currentOrder/reducer"
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { createWsMiddleware } from './wsOrders/middleware'
import { createWsActions } from './wsOrders/actions'


const wsOrderAllActions = createWsActions('wsOrderAll');
const wsPersonOrdersActions = createWsActions('wsPersonOrders');

const rootReducer = combineReducers({
  ingredients: ingredientsReduser, constructorBurger: constructorBurgerReduser,
  order: orderReduser, user: userReduser, wsOrderAll: wsReducerOrderAll, wsPersonOrders: wsReducerPersonOrders, currentOrder: currentOrder
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      createWsMiddleware(wsOrderAllActions),
      createWsMiddleware(wsPersonOrdersActions)
    ),

  devTools: true,
});


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector