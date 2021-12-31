import { useEffect, useState} from "react";
import {useParams} from 'react-router-dom';
const axios = require('axios');

export const Person = () =>{
    const [personData, setData] = useState({});

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
        });
    }, [params]);

    return(
        <h1>{personData.name}</h1>
    )
}