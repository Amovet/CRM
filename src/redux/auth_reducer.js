//created for the future even though it's not really needed right now

let initialState =
    {
        token:'testtoken',
        isAuth:'true'
    };


const AuthReducer = (state = initialState, action) => {
    switch (action.type) {
        default:
            return state;
    }

}

export default AuthReducer;