const initialState = {
    users:[

    ]
}

 const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'setUserList':
            return {
                ...state,
                users:action.payload
            }

        default:
            return state
    }
}

export default usersReducer

