const userDataReducer = (state = '', action) => {
    switch (action.type){
        case 'LOGIN':
            return action.payload;
        case 'LOGOUT':
            return '';
        case 'ADDWATCHLIST':
            const addMovie = state;
            addMovie.movies.push(action.payload);
            return addMovie;
        case 'REMOVEWATCHLIST':
            const removeMovie = state;
            removeMovie.movies = removeMovie.movies.filter(element => {return element.title !== action.payload.title});
            return removeMovie;
        default:
            return state;
    }
};

export default userDataReducer;