config = {
    login: false
};

export default (state = config, action) => {
    switch (action.type) {
        case "SET_LOGIN":
            return { ...state, login: action.value }
    }
    return state;
};
