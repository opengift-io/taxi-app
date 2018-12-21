map = {
    from:{},
    to: {}
  };
  
  export default (state = map, action) => {
    switch (action.type) {
      case "SET_FROM":
        return { ...state, from: action.value}
    }
    return state;
  };
  