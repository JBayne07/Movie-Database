import React from 'react';
import {useSelector} from 'react-redux';

export const Profile = () => {
    const userData = useSelector(state => state.userdata)
    return(
        <>
            <h1> Username: {userData.username} </h1>
            
            <h1>People</h1>
            {userData.people.map(element =>{
                return(
                    <h4>{element}</h4>
                )                
            })}

            <h1>Movies</h1>
            {userData.movies.map(element => {
                return(
                    <h4>{element}</h4>
                )
            })}
        </>
    )
}