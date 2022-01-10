import { useEffect, useState} from "react";
import {useParams, Link} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {followPerson, unfollowPerson} from '../actions';
import {Button} from '@mui/material';
const axios = require('axios');

export const Person = () =>{
    const [personData, setData] = useState({});
    const [visible, setVisibility] = useState(false);
    const dispatch = useDispatch();
    const params = useParams();
    useEffect(() => {
        let options = {
            url: 'http://localhost:9000/api/people/'+params.id,
            method: 'GET',
            headers: {
                'Accept' : 'application/json',
                'Content-Type' : 'application/json;charset=UTF-8'
            },
            withCredentials: true,
        };

        axios(options).then(response => {
            console.log(response.status);
            console.log(response.data);
            setData(response.data);
            setVisibility(true);
        });
    }, [params]);

    const follow = () => {
        dispatch(followPerson(personData));
        let options = {
            url: 'http://localhost:9000/api/users/followperson/'+personData._id,
            method: 'POST',
            headers: {
                'Accept' : 'application/json',
                'Content-Type' : 'application/json;charset=UTF-8'
            },
            withCredentials: true,
        };

        axios(options).then(response => {            
            console.log(response.status);
            console.log(response.data);
        });
    }

    const unfollow = () => {
        dispatch(unfollowPerson(personData));
        let options = {
            url: 'http://localhost:9000/api/users/unfollowperson/'+personData._id,
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
        });
    }

    return(
        <>
            {visible ? (
                <>
                    <h1>Name: {personData.name}</h1>

                    <Button variant='contained' color='inherit' onClick={follow}>
                        Follow
                    </Button>
                    <Button variant='contained' color='inherit' onClick={unfollow}>
                        Unfollow
                    </Button>

                    {personData.directed.length===0?null:(<h3>Movies Directed: </h3>)}                    
                    {personData.directed.map(element => {
                        return(
                            <>
                                <Link to={'/movie/'+element._id.toString()} className='Movie' color="inherit">
                                    {element.title}
                                </Link>
                                <br/>
                            </>
                        )
                        
                    })}

                    {personData.written.length===0?null:(<h3>Movies Written: </h3>)}
                    {personData.written.map(element => {
                        return(
                            <>
                                <Link to={'/movie/'+element._id.toString()} className='Movie' color="inherit">
                                    {element.title}
                                </Link>
                                <br/>
                            </>
                        )                        
                    })}

                    {personData.acted.length===0?null:(<h3>Movies Acted In: </h3>)}
                    {personData.acted.map(element => {
                        return(
                            <>
                                <Link to={'/movie/'+element._id.toString()} className='Movie' color="inherit">
                                    {element.title}
                                </Link>
                                <br/>
                            </>
                        )
                        
                    })}

                    <h3>Top Five Collaborators: </h3>
                    {personData.collaborators.map(element => {
                        return(
                            <>
                                <Link to={'/person/'+element._id.toString()} className='Person' color="inherit">
                                    {element.name}
                                </Link>
                                <br/>
                            </>
                        )
                    })}
                </>
            ):null}          

        </>
        
    )
}