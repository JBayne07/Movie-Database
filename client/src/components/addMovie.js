import {TextField, Button, List, ListItem, ListItemButton, ListItemText} from '@mui/material';
import {useState, useEffect} from 'react';
import './addMovie.css'
const axios = require('axios');

export const AddMovie = () => {
    const [title, setTitle] = useState('');
    const [releaseDate, setReleaseDate] = useState('');
    const [runtime, setRuntime] = useState(0);
    const [plot, setPlot] = useState('');
    const [genres, setGenres] = useState([]);
    const [textWriter, setTextWriter] = useState('');
    const [textDirector, setTextDirector] = useState('');
    const [textActor, setTextActor] = useState('');
    const [writerResult, setWriterResult] = useState([]);
    const [directorResult, setDirectorResult] = useState([]);
    const [actorResult, setActorResult] = useState([]);
    const [writerVisible, setWriterVisibility] = useState(false);
    const [directorVisible, setDirectorVisibility] = useState(false);
    const [actorVisible, setActorVisibility] = useState(false);
    const [person, setPerson] = useState('');

    useEffect(() => {
        if(textWriter===''){
            setWriterVisibility(false);
        }
        let options = {
            url: 'http://localhost:9000/api/people',
            method: 'GET',
            headers: {
                'Accept' : 'application/json',
                'Content-Type' : 'application/json;charset=UTF-8'
            },
            params:{
                person:textWriter,
            }
        };

        axios(options).then(response => {
            setWriterResult(response.data);
            if(!(response.data.message)){
                setWriterVisibility(true);
            }
            console.log(response.status);
            console.log(response.data);
        });

    }, [textWriter])

    useEffect(() => {
        if(textDirector===''){
            setDirectorVisibility(false);
        }
        let options = {
            url: 'http://localhost:9000/api/people',
            method: 'GET',
            headers: {
                'Accept' : 'application/json',
                'Content-Type' : 'application/json;charset=UTF-8'
            },
            params:{
                person:textDirector,
            }
        };

        axios(options).then(response => {
            setDirectorResult(response.data);
            if(!(response.data.message)){
                setDirectorVisibility(true);
            }
            console.log(response.status);
            console.log(response.data);
        });

    }, [textDirector])

    useEffect(() => {
        if(textActor===''){
            setActorVisibility(false);
        }
        let options = {
            url: 'http://localhost:9000/api/people',
            method: 'GET',
            headers: {
                'Accept' : 'application/json',
                'Content-Type' : 'application/json;charset=UTF-8'
            },
            params:{
                person:textActor,
            }
        };

        axios(options).then(response => {
            setActorResult(response.data);
            if(!(response.data.message)){
                setActorVisibility(true);
            }
            console.log(response.status);
            console.log(response.data);
        });

    }, [textActor])

    const addMovie = () => {
        let writers = document.getElementsByClassName('writerSelected')[0].innerText;
        let directors = document.getElementsByClassName('directorSelected')[0].innerText;
        let actors = document.getElementsByClassName('actorSelected')[0].innerText;
        writers = writers.split(',');
        directors = directors.split(',');
        actors = actors.split(',');
        console.log(writers);
        console.log(directors);
        console.log(actors);

        let options = {
            url: 'http://localhost:9000/api/movies',
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8'
            },
            withCredentials: true,
            data:{
                title: title,
                releaseDate: releaseDate,
                runtime: runtime,
                plot: plot,
                genres: genres,
                writers: writers,
                directors: directors,
                actors: actors
            }
        };

        axios(options).then(response => {
            console.log(response.status);
        });
    }

    const writerListClick = value => {
        const element = document.getElementsByClassName('writerSelected')[0];
        const text = element.textContent;
        if(text.includes(value)){
            return;
        }
        if(text.length === 0){
            element.innerHTML = value;
        }else{
            element.innerHTML = text + ', ' + value;
        }
    }

    const clearWriters = () => {
        const element = document.getElementsByClassName('writerSelected')[0];
        element.innerHTML = '';
    }

    const directorListClick = value => {
        const element = document.getElementsByClassName('directorSelected')[0];
        const text = element.textContent;
        if(text.includes(value)){
            return;
        }
        if(text.length === 0){
            element.innerHTML = value;
        }else{
            element.innerHTML = text + ', ' + value;
        }
    }

    const clearDirectors = () => {
        const element = document.getElementsByClassName('directorSelected')[0];
        element.innerHTML = '';
    }

    const actorListClick = value => {
        const element = document.getElementsByClassName('actorSelected')[0];
        const text = element.textContent;
        if(text.includes(value)){
            return;
        }
        if(text.length === 0){
            element.innerHTML = value;
        }else{
            element.innerHTML = text + ', ' + value;
        }
    }

    const clearActors = () => {
        const element = document.getElementsByClassName('actorSelected')[0];
        element.innerHTML = '';
    }

    const addPerson = () => {

        let options = {
            url: 'http://localhost:9000/api/people',
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8'
            },
            withCredentials: true,
            data:{
                person: person
            }
        };

        axios(options).then(response => {
            console.log(response.status);
        });

    }

    return(
        <>
            <div>                
            
                <h1>Add Movie</h1>

                <TextField id="title" label="Title" variant="filled" onChange={(event) => {setTitle(event.target.value)}} />
                <br/>
                <TextField id="releaseDate" label="Release Date" variant="filled" onChange={(event) => {setReleaseDate(event.target.value)}}/>
                <br/>
                <TextField id="runtime" label="Runtime" variant="filled" onChange={(event) => {setRuntime(event.target.value)}}/>
                <br/>
                <TextField id="plot" label="Plot" variant="filled" onChange={(event) => {setPlot(event.target.value)}}/>
                <br/>
                <TextField id="genres" label="Genre Keywords" variant="filled" onChange={(event) => {setGenres(event.target.value)}}/>
                <br/>
                <TextField id="writer" label="Writers" variant="filled" onChange={(event) => {setTextWriter(event.target.value)}}/>
                <div className='writerSelected'/>
                <div>
                    <Button variant='contained' color='inherit' onClick={clearWriters}>
                        Clear Writers Selected
                    </Button>
                </div>
                
                <div className='writerList'>            
                    <List>
                        {writerVisible?(
                            writerResult.map(element => {
                                return(
                                    <>
                                        <ListItem disablePadding>
                                            <ListItemButton onClick={() => writerListClick(element.name)}>
                                                <ListItemText primary={element.name} />
                                            </ListItemButton>
                                        </ListItem>
                                    </>
                                )
                            })
                        ):null}
                    </List>
                </div>
                
                <TextField id="director" label="Directors" variant="filled" onChange={(event) => {setTextDirector(event.target.value)}}/>
                <div className='directorSelected'/>
                <div>
                    <Button variant='contained' color='inherit' onClick={clearDirectors}>
                        Clear Directors Selected
                    </Button>
                </div>            
                <div className='directorList'>
                    <List>
                        {directorVisible?(
                            directorResult.map(element => {
                                return(
                                    <>
                                        <ListItem disablePadding>
                                            <ListItemButton onClick={() => directorListClick(element.name)}>
                                            <ListItemText primary={element.name} />
                                            </ListItemButton>
                                        </ListItem>
                                    </>
                                )
                            })
                        ):null}                
                    </List>
                </div>            
                <TextField id="actor" label="Actors" variant="filled" onChange={(event) => {setTextActor(event.target.value)}}/>
                <div className='actorSelected'/>
                <div>
                    <Button variant='contained' color='inherit' onClick={clearActors}>
                        Clear Actors Selected
                    </Button>
                </div>
                
                <div className='actorList'>
                    <List>
                        {actorVisible?(
                            actorResult.map(element => {
                                return(
                                    <>
                                        <ListItem disablePadding>
                                            <ListItemButton onClick={() => actorListClick(element.name)}>
                                            <ListItemText primary={element.name} />
                                            </ListItemButton>
                                        </ListItem>
                                    </>
                                )
                            })
                        ):null}
                    </List>
                </div>
                
                <Button variant='contained' color='inherit' onClick={addMovie}>
                    Add Movie
                </Button>
            </div>

            <div>           
                <h1>Add Person</h1>
                <TextField id="name" label="Name" variant="filled" onChange={(event) => {setPerson(event.target.value)}} />
                <br/>
                <Button variant='contained' color='inherit' onClick={addPerson}>
                    Add Person
                </Button>
            </div>

        </>
    )
}