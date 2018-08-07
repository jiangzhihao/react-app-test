const initState = {
    list: [],
    currentPage: 1,
    totalPage: 4
}
function reducer(state = initState, action) {
    switch (action.type) {
        case 'INIT': {
            return {
                ...state,
                list: action.payload
            }
        }
        case 'SET_PAGE_NUM': {
            return {
                ...state,
                currentPage: action.payload
            }
        }
        default: return state
    }
}

export default reducer;