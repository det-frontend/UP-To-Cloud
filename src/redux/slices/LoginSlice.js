import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    name: "",
    login: false,
    token: "",
    stationId: '',
    language:'English'
}

export const LoginSlice = createSlice({
    name: 'Login',
    initialState: initialState,
    reducers: {
        LoginUser: (state, action) => {
            state.name = action.payload.name;
            state.login = true;
            state.token = action.payload.token
            state.stationId = action.payload.stationId
            state.language = action.payload.language
        },
        LogoutUser: (state, action) => {
            state.name = "";
            state.login = false;
            state.token = "";
            state.language = "English";
        },
        UpdateLanguage: (state, action) => {
            state.language = action.payload.language
        }
    }
});

export const { LoginUser, LogoutUser,UpdateLanguage } = LoginSlice.actions;
export default LoginSlice.reducer;

