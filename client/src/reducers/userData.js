const userDataReducer = (state = '', action) => {
    switch (action.type){
        case 'LOGIN':
            return action.payload;
        case 'LOGOUT':
            return '';
        case 'ADDWATCHLIST':
            let addMovie = [...state.movies];
            if(state){
                if(!(state.movies.some(element=>element.title===action.payload.title))){
                    addMovie.push(action.payload);
                    
                }
            }
            return {
                ...state,
                movies: addMovie
            }

        case 'REMOVEWATCHLIST':
            return{
                ...state,
                movies: state.movies.filter(element => {return element.title !== action.payload.title})
            }

        case 'FOLLOWPERSON':
            let followPerson = [...state.people];
            if(state){
                if(!(state.people.some(element=>element.name===action.payload.name))){
                    followPerson.push(action.payload);
                }
            }            
            return {
                ...state,
                people: followPerson
            }

        case 'UNFOLLOWPERSON':
            return{
                ...state,
                people: state.people.filter(element => {return element.name !== action.payload.name})
            }

        case 'FOLLOWUSER':
            let followUser = [...state.users]
            console.log(state.users);
            if(state){
                if(!(state.users.some(element=>element.username===action.payload.username))){            
                    followUser.push(action.payload);
                }
            }            
            return {
                ...state,
                users: followUser
            }

        case 'UNFOLLOWUSER':
            return{
                ...state,
                users: state.users.filter(element => {return element.username !== action.payload.username})
            }
        
        case 'CONTRIBUTE':
            return{
                ...state,
                contribute:action.payload
            };

        default:
            return state;
    }
};

export default userDataReducer;