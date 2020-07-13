import * as types from './modalTypes'

export const showModal = () => ({
    type: types.SHOW_MODAL
})

export const hideModal = () => ({
    type: types.HIDE_MODAL
})

export const changeModalTitle = title => ({
    type: types.CHANGE_MODAL_TITLE,
    payload: {
        title
    }
})

export const changeModalContent = component => ({
    type: types.CHANGE_MODAL_CONTENT,
    payload: {
        component
    }
})