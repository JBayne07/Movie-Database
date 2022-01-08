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
        case 'FOLLOWPERSON':
            const followPerson = state;
            followPerson.people.push(action.payload);
            return followPerson;
        case 'UNFOLLOWPERSON':
            const unfollowPerson = state;
            unfollowPerson.people = unfollowPerson.people.filter(element => {return element.name !== action.payload.name});
            return unfollowPerson;
        case 'FOLLOWUSER':
            const followUser = state;
            followUser.users.push(action.payload);
            return followUser;
        case 'UNFOLLOWUSER':
            const unfollowUser = state;
            unfollowUser.users = unfollowUser.users.filter(element => {return element.username !== action.payload.username});
            return unfollowUser;
        default:
            return state;
    }
};

export default userDataReducer;