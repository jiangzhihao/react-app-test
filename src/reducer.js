const initState = {
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
        default: return state
    }
}

export default reducer;