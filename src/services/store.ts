import { combineReducers, configureStore } from '@reduxjs/toolkit'
import ingredientsReduser from "./ingredients/reducer"
import constructorBurgerReduser from "./constructor/reducer"
import orderReduser from "./order/reducer"
import userReduser from "./user/reducer"
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

const rootReducer = combineReducers({ingredients: ingredientsReduser, constructorBurger: constructorBurgerReduser, order: orderReduser, user: userReduser})

export const store = configureStore({
  reducer: rootReducer,
  devTools: true
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector