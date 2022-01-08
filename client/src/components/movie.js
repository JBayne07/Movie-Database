import { useEffect, useState} from "react";
import {useParams, Link} from 'react-router-dom';
import {TextField, Button} from '@mui/material';
import { useDispatch } from "react-redux";
import { addWatchList, removeWatchList } from "../actions";
const axios = require('axios');

export const Movie = () =>{
    const dispatch = useDispatch();
    const [movieData, setData] = useState({});
    const [visible, setVisibility] = useState(false);
    const [score, setScore] = useState(0);
    const [summary, setSummary] = useState('');
    const [details, setDetails] = useState('');

    const params = useParams();
    useEffect(() => {
        let options = {
            url: 'http://localhost:9000/api/movies/'+params.id,
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

    }, [params, visible]);

    const addMovie = () => {
        dispatch(addWatchList(movieData));
        let options = {
            url: 'http://localhost:9000/api/users/watchlist/'+movieData._id,
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

    const removeMovie = () => {
        dispatch(removeWatchList(movieData));
        let options = {
            url: 'http://localhost:9000/api/users/watchlist/'+movieData._id,
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

    const addReview = () => {
        let options = {
            url: 'http://localhost:9000/api/reviews',
            method: 'POST',
            headers: {
                'Accept' : 'application/json',
                'Content-Type' : 'application/json;charset=UTF-8'
            },
            data:{
                score: score,
                summary: summary,
                details: details,
                movieId: movieData._id
            },
            withCredentials: true
        };

        axios(options).then(response => {
            setVisibility(false);
            console.log(response.status);
            console.log(response.data);
        });
    }

    return(
        <>
            {visible?(
                <>
                    <h1>Title: {movieData.title}</h1>
                    <Button variant='contained' color='inherit' onClick={addMovie}>
                        Add To WatchList
                    </Button>
                    <Button variant='contained' color='inherit' onClick={removeMovie}>
                        Remove From WatchList
                    </Button>

                    <h3>Release Date: {movieData.releaseDate}</h3>
                    <h3>Runtime: {movieData.runtime}</h3>
                    <h5>Plot: {movieData.plot}</h5>

                    <h5>Genres: </h5>
                    {movieData.genres.map(element => {
                        return(
                            <p>{element}</p>
                        )
                    })}

                    <h5>Directors: </h5>
                    {movieData.directors.map(element => {
                        return(
                            <>
                                <Link to={'/person/'+element._id.toString()} className='Person' color="inherit">
                                    {element.name}
                                </Link>
                                <br/>
                            </>
                        )
                    })}

                    <h5>Writers: </h5>
                    {movieData.writers.map(element => {
                        return(
                            <>
                                <Link to={'/person/'+element._id.toString()} className='Person' color="inherit">
                                    {element.name}
                                </Link>
                                <br/>
                            </>
                        )
                    })}

                    <h5>Actors: </h5>
                    {movieData.actors.map(element => {
                        return(
                            <>
                                <Link to={'/person/'+element._id.toString()} className='Person' color="inherit">
                                    {element.name}
                                </Link>
                                <br/>
                            </>
                        )
                    })}

                    <h5>Reviews: </h5>
                    {movieData.reviews.map(element => {
                        return(
                            <>
                                <p>{element.score}</p>
                                    {element.user?(
                                    <>
                                        <Link to={'/user/'+element.user._id.toString()} className='User' color="inherit">
                                            {element.user.username}
                                        </Link>
                                    </>
                                ):null}
                                
                            </>
                        )
                    })}

                    <h5>Add A Review:</h5>
                    <TextField id="score" label="Enter Score" variant="filled" onChange={(event) => {setScore(event.target.value)}} />
                    <br/>
                    <TextField id="summary" label="Enter Summary" variant="filled" onChange={(event) => {setSummary(event.target.value)}} />
                    <br/>
                    <TextField id="details" label="Enter Full Details" variant="filled" onChange={(event) => {setDetails(event.target.value)}} />
                    <br/>
                    <Button variant='contained' color='inherit' onClick={addReview}>
                        Add Review
                    </Button>
                </>
            ):null}
        </>
        
    )
}