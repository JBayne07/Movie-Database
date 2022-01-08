import React from 'react';
import {Link, Navigate} from 'react-router-dom';
import {useSelector} from 'react-redux';

export const Profile = () => {
    const userData = useSelector(state => state.userdata)

    // useEffect(()=>{
    //     const options = {
    //         url: 'http://localhost:9000/api/users',
    //         method: 'GET',
    //         headers: {
    //             'Accept' : 'application/json',
    //             'Content-Type' : 'application/json;charset=UTF-8'
    //         }
    //     }

    //     axios(options).then(response =>{
    //         console.log(response.data);
    //     });
    // },[])

    return(
        <>
            {userData ? (
                <>
                    <h1> Username: {userData.username} </h1>

                    <h3>Users</h3>

                    {userData.users.map(element => {
                        return(
                            <>
                                <Link to={'/user/'+element._id.toString()} className='User' color="inherit">
                                    {element.username}
                                </Link>
                            </>
                        )
                    })}

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
            ): <Navigate to='/login'/>}            
        </>
    )
}