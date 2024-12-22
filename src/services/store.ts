import { combineReducers, configureStore } from '@reduxjs/toolkit'
import ingredientsReduser from "./ingredients/reducer"
import constructorBurgerReduser from "./constructor/reducer"
import orderReduser from "./order/reducer"
import userReduser from "./user/reducer"
import wsReducerOrderAll from "./wsOrdersAll/reducer"
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { webSocketMiddleware } from './wsOrdersAll/middleware'
import { WS_URL_ORDERS_ALL } from '../utils/consts'

const rootReducer = combineReducers({ ingredients: ingredientsReduser, constructorBurger: constructorBurgerReduser, 
  order: orderReduser, user: userReduser, wsOrderAll: wsReducerOrderAll })

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(webSocketMiddleware(WS_URL_ORDERS_ALL)),
  devTools: true
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector