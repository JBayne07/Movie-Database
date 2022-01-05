import { useEffect, useState} from "react";
import {useParams, Link} from 'react-router-dom';
const axios = require('axios');

export const Person = () =>{
    const [personData, setData] = useState({});
    const [visible, setVisibility] = useState(false);

    const params = useParams();
    useEffect(() => {
        let options = {
            url: 'http://localhost:9000/api/people/'+params.id,
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
                    <h1>Name: {personData.name}</h1>

                    <h3>Movies Directed: </h3>
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

                    <h3>Movies Written: </h3>
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

                    <h3>Movies Acted In: </h3>
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