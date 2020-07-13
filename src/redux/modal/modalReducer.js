import * as modalTypes from './modalTypes'

const initialState = {
    showModal: false,
    title: '',
    component: null
}

const reducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case modalTypes.SHOW_MODAL:
            return {
                ...state,
                showModal: true
            }
        case modalTypes.HIDE_MODAL:
            return {
                ...state,
                showModal: false,
                title: '',
                component: null
            }
        case modalTypes.CHANGE_MODAL_CONTENT:
            return {
                ...state,
                component: payload.component
            }
        case modalTypes.CHANGE_MODAL_TITLE:
            return {
                ...state,
                title: payload.title
            }
        default:
            return state
    }
}

export default reducer