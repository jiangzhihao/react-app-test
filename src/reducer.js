const initState = {
    index: 0,
    list: []
}
function reducer(state = initState, action) {
    switch (action.type) {
        case 'INIT': {
            return {
                ...state,
                list: action.payload
            }
        }
        case 'SET_ARTICLE_INDEX': {
            return {
                ...state,
                index: action.payload,
                list: state.list
            }
        }
        default: return state
    }
}

export default reducer;