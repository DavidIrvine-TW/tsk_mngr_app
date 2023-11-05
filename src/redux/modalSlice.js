import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    type: '',
    modalDetail: {}
}

const ModalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {

        modalIsOpen: (state, action) => {
            return {...state, ...action.payload}
        },

        modalIsClosed: (state) => {
            return {...state, type: ''}
        },
    }
})

export const {modalIsOpen, modalIsClosed} = ModalSlice.actions
export default ModalSlice.reducer