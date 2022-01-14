import React, {useEffect, useState} from 'react';
import {Link, Navigate} from 'react-router-dom';
import {Button, Radio, RadioGroup, FormControlLabel, FormLabel, FormControl} from '@mui/material';
import {useSelector, useDispatch} from 'react-redux';
import {contribute, removeWatchList, unfollowPerson, unfollowUser} from '../actions'
const axios = require('axios');

export const Profile = () => {
    const user = useSelector(state => state.userdata);
    const [userData, setData] = useState(user);
    const [visible, setVisibility] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        if(!(user)){
            console.log('hi')
            return;
        }
        let options = {
            url: 'http://localhost:9000/api/users/'+user._id,
            method: 'GET',
            headers: {
                'Accept' : 'application/json',
                'Content-Type' : 'application/json;charset=UTF-8'
            },
        };

        axios(options).then(response => {
            console.log(response.status);
            console.log(response.data);
            setData(response.data);
            // if(response.data){
            //     console.log(response.data);
                setVisibility(true);
            // }
        });
    }, [visible])

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
            setVisibility(false);
        });
    }

    const unFollowPerson = (element) => {
        dispatch(unfollowPerson(element));
        let options = {
            url: 'http://localhost:9000/api/users/unfollowperson/'+element._id,
            method: 'PUT',
            headers: {
                'Accept' : 'application/json',
                'Content-Type' : 'application/json;charset=UTF-8'
            },
            withCredentials: true,
        };

        axios(options).then(response => {            
            console.log(response.status);
            console.log(response.data);
            setVisibility(false);
        });
    }

    const unFollowUser = (element) => {
        dispatch(unfollowUser(element));
        let options = {
            url: 'http://localhost:9000/api/users/unfollowuser/'+element._id,
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
            setVisibility(false);
        });
    }
    

    return(
        <>
            {user?null:<Navigate to='/login'/>}

            {visible ? (
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
                                <Button variant='contained' color='inherit' onClick={() => unFollowUser(element)}>
                                    Unfollow
                                </Button>
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
                                <Button variant='contained' color='inherit' onClick={() => unFollowPerson(element)}>
                                    Unfollow
                                </Button>
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
            ): null}            
        </>
    )
}