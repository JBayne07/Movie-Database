const userDataReducer = (state = '', action) => {
    switch (action.type){
        case 'LOGIN':
            return action.payload;
        case 'LOGOUT':
            return '';
        case 'ADDWATCHLIST':
            const addMovie = state;
            if(addMovie){
                if(!(addMovie.movies.some(element=>element.title===action.payload.title))){
                    addMovie.movies.push(action.payload);              
                }
            }            
            return addMovie;

        case 'REMOVEWATCHLIST':
            const removeMovie = state;
            if(removeMovie){
                removeMovie.movies = removeMovie.movies.filter(element => {return element.title !== action.payload.title});
            }
            return removeMovie;

        case 'FOLLOWPERSON':
            const followPerson = state;
            if(followPerson){
                if(!(followPerson.people.some(element=>element.name===action.payload.name))){
                    console.log(followPerson.people.includes(action.payload));
                    followPerson.people.push(action.payload);
                }
            }            
            return followPerson;

        case 'UNFOLLOWPERSON':
            const unfollowPerson = state;
            if(unfollowPerson){
                unfollowPerson.people = unfollowPerson.people.filter(element => {return element.name !== action.payload.name});
            }
            return unfollowPerson;

        case 'FOLLOWUSER':
            const followUser = state;
            if(followUser){
                if(!(followUser.users.some(element=>element.username===action.payload.username))){            
                    followUser.users.push(action.payload);
                }
            }            
            return followUser;

        case 'UNFOLLOWUSER':
            const unfollowUser = state;
            if(unfollowUser){
                unfollowUser.users = unfollowUser.users.filter(element => {return element.username !== action.payload.username});
            }
            return unfollowUser;

        default:
            return state;
    }
};

export default userDataReducer;