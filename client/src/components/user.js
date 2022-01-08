import React, {useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {Button} from '@mui/material';
import {followUser, unfollowUser} from '../actions'
const axios = require('axios');

export const User = () => {
    const dispatch = useDispatch();
    const loggedUserData = useSelector(state => state.userdata);
    const [visible, setVisibility] = useState(false);
    const [userData, setData] = useState({});
    const params = useParams();

    useEffect(() => {
        let options = {
            url: 'http://localhost:9000/api/users/'+params.id,
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
            setVisibility(true);
        });
    }, [params]);

    const follow = () => {
        dispatch(followUser(userData));
        let options = {
            url: 'http://localhost:9000/api/users/followuser/'+params.id,
            method: 'POST',
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

    const unfollow = () => {
        dispatch(unfollowUser(userData));
        let options = {
            url: 'http://localhost:9000/api/users/unfollowuser/'+params.id,
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
            {visible ? (
                <>
                    <h1> Username: {userData.username} </h1>

                    {userData._id !== loggedUserData._id?(
                        <>
                            <Button variant='contained' color='inherit' onClick={follow}>
                                Follow
                            </Button>
                            <Button variant='contained' color='inherit' onClick={unfollow}>
                                Unfollow
                            </Button>
                        </>
                    ):null}

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
                                <br/>
                            </>
                        )
                    })}

                    <h3>Reviews</h3>
                    {userData.reviews.map(element => {
                        return(
                            <>
                                <p>{element.score}</p>
                                {/* <Button variant='contained' color='inherit' onClick={fullReview}>
                                    View Full Review
                                </Button> */}
                            </>
                        )
                    })}
                </>
            ): null}
        </>
    )
}