import React from 'react';
import {useSelector} from 'react-redux';

export const Profile = () => {
    const userData = useSelector(state => state.userdata)
    return(
        <>
        <h1> {userData.username} </h1>
        </>
    )
}