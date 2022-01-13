import React from 'react';
import {Link, Navigate} from 'react-router-dom';
import {Button, Radio, RadioGroup, FormControlLabel, FormLabel, FormControl} from '@mui/material';
import {useSelector, useDispatch} from 'react-redux';
import {contribute, removeWatchList} from '../actions'
const axios = require('axios');

export const Profile = () => {
    const userData = useSelector(state => state.userdata)
    const dispatch = useDispatch();
    const handleChange = (event) => {
        // console.log(event.target.value);
        let flag = (event.target.value==='contributing');
        let options = {
            url: 'http://localhost:9000/api/users/contribute',
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8'
            },            
            data:{
                contribute: flag
            },
            withCredentials: true
        };

        axios(options).then(response => {
            dispatch(contribute(flag));
            console.log(response.status, response.data);
        });
    }

    const removeMovie = (element) => {
        dispatch(removeWatchList(element));
        let options = {
            url: 'http://localhost:9000/api/users/watchlist/'+element._id,
            method: 'PUT',
            headers: {
                'Accept' : 'application/json',
                'Content-Type' : 'application/json;charset=UTF-8'
            },
            withCredentials: true
        };

        axios(options).then(response => {
            console.log(response.status);
            console.log(response.data);
        });
    }

    return(
        <>
            {userData ? (
                <>
                    <h1> Username: {userData.username} </h1>
                    <FormControl>
                        <FormLabel>Account Type</FormLabel>
                        <RadioGroup row aria-label='accountType' name='radioButtonGroup' onChange={handleChange}>
                            <FormControlLabel value='regular' control={<Radio />} label={'Regular'}/>
                            <FormControlLabel value='contributing' control={<Radio />} label={'Contributing'}/>
                        </RadioGroup>
                    </FormControl>

                    <h3>Users</h3>

                    {userData.users.map(element => {
                        return(
                            <>
                                <Link to={'/user/'+element._id.toString()} className='User' color="inherit">
                                    {element.username}
                                </Link>
                            </>
                        )
                    })}

                    <h3>People</h3>

                    {userData.people.map(element =>{
                        return(
                            <>
                                <Link to={'/person/'+element._id.toString()} className='Person' color="inherit">
                                    {element.name}
                                </Link>
                                <br/>
                            </>
                        )                
                    })}

                    <h3>Movies</h3>
                    
                    {userData.movies.map(element => {
                        return(
                            <>
                                <Link to={'/movie/'+element._id.toString()} className='Movie' color="inherit">
                                    {element.title}
                                </Link>                                
                                <Button variant='contained' color='inherit' onClick={() => removeMovie(element)}>
                                    Remove From WatchList
                                </Button>
                                <br/>
                            </>
                        )
                    })}

                    <h3>Recommended Movies</h3>

                    {userData.recommendedMovies.map(element => {
                        return(
                            <>
                                <Link to={'/movie/'+element._id.toString()} className='Movie' color="inherit">
                                    {element.title}
                                </Link>
                                <br/>
                            </>
                        )
                    })}
                </>
            ): <Navigate to='/login'/>}            
        </>
    )
}