import React, {useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom';
const axios = require('axios');

export const User = () => {
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
    
    return(
        <>
            {visible ? (
                <>
                    <h1> Username: {userData.username} </h1>
            
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
                </>
            ): null}
        </>
    )
}