user = {
    info: {}
};

export default (state = user, action) => {
    switch (action.type) {
        case "SET_USER":
            return { ...state, info: action.value }
    }
    return state;
};
