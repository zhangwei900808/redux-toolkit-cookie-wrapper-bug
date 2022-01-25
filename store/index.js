import {configureStore, combineReducers} from '@reduxjs/toolkit';
import {createWrapper,HYDRATE} from 'next-redux-wrapper';
import {nextReduxCookieMiddleware, wrapMakeStore} from "next-redux-cookie-wrapper";
import logger from "redux-logger";
import {authSlice} from '../store/authSlices';


const combinedReducers = combineReducers({
  [authSlice.name]: authSlice.reducer
});


const rootReducer = (state, action) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state, // use previous state
      ...action.payload, // apply delta from hydration
    }
    return nextState
  }
  return combinedReducers(state, action)
}

export const initStore = () => configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(
    nextReduxCookieMiddleware({
      // 是否压缩
      compress: false,
      subtrees: ["auth.accessToken", "auth.refreshToken", "auth.isLogin", "auth.me"],
    })
  )
})

export const store = wrapMakeStore(initStore);
export const wrapper = createWrapper(store, {storeKey: 'key', debug: process.env.NODE_ENV === `development`});

