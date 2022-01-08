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