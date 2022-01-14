import {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {TextField, Button} from '@mui/material';
const axios = require('axios');

export const Search = () => {
    const [searchTitle, setTitle] = useState('');
    const [searchName, setName] = useState('');
    const [searchGenre, setGenre] = useState('');
    const [count, setCount] = useState(0);
    const [searchData, setData] = useState([]);
    const [visible, setVisibility] = useState(false);

    useEffect(()=>{
        // console.log('hi');

        setVisibility(false);
        
        let options = {
            url: 'http://localhost:9000/api/movies',
            method: 'GET',
            headers: {
                'Accept' : 'application/json',
                'Content-Type' : 'application/json;charset=UTF-8'
            },
            params:{
                title:searchTitle,
                name:searchName,
                genre:searchGenre,
                count:count

            }
        };

        axios(options).then(response => {
            console.log(response.status);
            console.log(response.data);
            setData(response.data);
            setVisibility(true);
        });

    }, [searchTitle, searchName, searchGenre, count]);

    const nextPage = () => {
        console.log('next');
        setCount(count => count+1);
    }

    const previousPage = () => {
        console.log('previous');
        setCount(count => count-1);

    }

    return(
        <>
            <h1>
                Search For Movies
            </h1>

            <TextField id="titleSearch" label="Title" variant="filled" onChange={(event) => {setTitle(event.target.value)}} />
            <br/>
            <TextField id="nameSearch" label="Actor Name" variant="filled" onChange={(event) => {setName(event.target.value)}} />
            <br/>
            <TextField id="genreSearch" label="Genre" variant="filled" onChange={(event) => {setGenre(event.target.value)}} />
            <br/>

            {visible? (searchData.map(element => {
                return(
                    <>
                        <Link to={'/movie/'+element._id.toString()} className='Movie' color="inherit">
                                {element.title}
                        </Link>
                        <br/>
                    </>
                )
            })):null}
            {count>0?(
                <Button variant='contained' color='inherit' onClick={previousPage}>
                    Previous
                </Button>
            ):null}
            
            <Button variant='contained' color='inherit' onClick={nextPage}>
                Next
            </Button>
            
        </>
    )    
}