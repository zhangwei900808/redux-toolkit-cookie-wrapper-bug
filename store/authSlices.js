import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
// 登录
export const login = createAsyncThunk('auth/login', async (params, thunkAPI) => {
  try {
    debugger
    const userName = params.userName;
    return {
      accessToken: `${userName} accessToken`,
      refreshToken: `${userName} refreshToken`,
      isLogin: true,
      me: {
        name: userName
      }
    };
  } catch (error) {
    return thunkAPI.rejectWithValue({errorMsg: error.message});
  }
});


// 退出登录
export const logout = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    return true
  } catch (error) {
    return thunkAPI.rejectWithValue({errorMsg: error.message});
  }
});

// 初始化数据
const internalInitialState = {
  accessToken: null,
  refreshToken: null,
  me: null,
  isLogin: false,
};

// reducer
export const authSlice = createSlice({
  name: 'auth',
  initialState: internalInitialState,
  reducers: {
  },
  extraReducers: {
    [login.fulfilled]: (state, action) => {
      const accessToken = action.payload.accessToken;
      const refreshToken = action.payload.refreshToken;
      const isLogin = action.payload.isLogin;
      const me = action.payload.me;

      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
      state.isLogin = isLogin;
      state.me = me;
    },
    [logout.fulfilled]: (state, action) => {
      state.accessToken = '';
      state.refreshToken = '';
      state.me = null;
      state.isLogin = false;
    }
  }
});




















