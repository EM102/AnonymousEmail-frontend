import { createSlice } from "@reduxjs/toolkit";
import { UsersData } from "./FakeData";

export const userSlice = createSlice({
  name: "users",
  initialState: { value: UsersData },
  reducers: {
    addUser: (state: { value: any[] }, action: { payload: any }) => {
      state.value.push(action.payload);
    },
    reset: (state, action) => {
      state.value = UsersData;
    },
  },
});

export const { addUser, reset } = userSlice.actions;
export default userSlice.reducer;
