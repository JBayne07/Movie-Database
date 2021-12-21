import {TextField, Button} from '@mui/material'
const axios = require('axios')

export const Login = () => {

    const login = () =>{

    }

    const addUser = () =>{
        let options = {
            url: 'http://localhost:9000/api/user',
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8'
            },
            data:{
                username: 'blah',
                password: 'blahblah'
            }
        };

        axios(options).then(response => {
            console.log(response.status);
        });
    }


    return(
        <>
        <TextField id="filled-basic" label="Username" variant="filled" />
        <br/>
        <TextField id="filled-basic" label="Password" variant="filled" />
        <br/>
        <Button variant='contained' color='inherit' onClick={login}>
            Login
        </Button>
        <Button variant='contained' color='inherit' onClick={addUser}>
            Register
        </Button>
        </>
    )    
}