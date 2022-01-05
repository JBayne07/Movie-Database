import { useEffect, useState} from "react";
import {useParams, Link} from 'react-router-dom';
const axios = require('axios');

export const Movie = () =>{
    const [movieData, setData] = useState({});
    const [visible, setVisibility] = useState(false);

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

    }, [params]);

    return(
        <>
            {visible?(
                <>
                    <h1>Title: {movieData.title}</h1>
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
                </>
            ):null}
        </>
        
    )
}