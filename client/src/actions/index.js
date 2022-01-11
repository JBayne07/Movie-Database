export const loginAction = (userData) => {
    return{
        type: 'LOGIN',
        payload: userData
    };
};

export const logoutAction = () => {
    return{
        type: 'LOGOUT'
    };
};

export const addWatchList = (movieData) => {
    return{
        type:'ADDWATCHLIST',
        payload: movieData        
    };
};

export const removeWatchList = (movieData) => {
    return{
        type:'REMOVEWATCHLIST',
        payload: movieData        
    };
};

export const followPerson = (personData) => {
    return{
        type:'FOLLOWPERSON',
        payload: personData
    };
};

export const unfollowPerson = (personData) => {
    return{
        type:'UNFOLLOWPERSON',
        payload: personData
    };
};

export const followUser = (userData) => {
    return{
        type:'FOLLOWUSER',
        payload: userData
    };
};

export const unfollowUser = (userData) => {
    return{
        type:'UNFOLLOWUSER',
        payload: userData
    };
};

export const contribute = (flag) => {
    return{
        type: 'CONTRIBUTE',
        payload: flag
    }
}