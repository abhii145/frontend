// src/userSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: UserProps = {
  user: null,
  loading: false,
};

const userSlice = createSlice({
  name: "userReducer",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User>) {
      (state.loading = false), (state.user = action.payload);
    },
    clearUser(state) {
      (state.loading = false), (state.user = null);
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
