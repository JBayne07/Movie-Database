export const loginAction = (userData) => {
    return{
        type: 'LOGIN',
        payload: userData
    };
};