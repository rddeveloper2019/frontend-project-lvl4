import { createSlice } from '@reduxjs/toolkit';

const chatSlice = createSlice({
  name: 'modal',
  initialState: {
    isShown: false,
    modalType: null,
  },
  reducers: {
    showModal: (state, action) => {
      state.isShown = true;
      state.modalType = action.payload;
    },
    closeModal: (state) => {
      state.isShown = false;
      state.modalType = null;
    },

  },

});

const { reducer } = chatSlice;
const { showModal, closeModal } = chatSlice.actions;

export {
  reducer, showModal, closeModal,
};
export default reducer;
