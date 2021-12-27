import {TextField, Button} from '@mui/material';
import {useState} from 'react';
import {useDispatch} from 'react-redux';
import {loginAction} from '../actions/index';
const axios = require('axios');

export const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();

    const login = () =>{
        let options = {
            url: 'http://localhost:9000/api/login',
            method: 'POST',
            headers: {
                'Accept' : 'application/json',
                'Content-Type' : 'application/json;charset=UTF-8'
            },
            data:{
                username: username,
                password: password
            }
        };

        axios(options).then(response => {
            console.log(response.status);
            dispatch(loginAction(response.data));
        });        
    }

    const addUser = () =>{
        let options = {
            url: 'http://localhost:9000/api/users',
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8'
            },
            data:{
                username: username,
                password: password
            }
        };

        axios(options).then(response => {
            console.log(response.status);
        });
    }

    const test = () => {
        let options = {
            url: 'http://localhost:9000/api/session',
            method: 'GET',
            headers: {
                'Accept' : 'application/json',
                'Content-Type' : 'application/json;charset=UTF-8'
            },
        };

        axios(options).then(response => {
            console.log(response.status);
        });
    }


    return(
        <>        
        <TextField id="username" label="Username" variant="filled" onChange={(event) => {setUsername(event.target.value)}} />
        <br/>
        <TextField id="password" label="Password" variant="filled" onChange={(event) => {setPassword(event.target.value)}}/>
        <br/>
        <Button variant='contained' color='inherit' onClick={login}>
            Login
        </Button>
        <Button variant='contained' color='inherit' onClick={test}>
            Test
        </Button>
        <Button variant='contained' color='inherit' onClick={addUser}>
            Register
        </Button>
        </>
    )    
}