import {Profile} from './components/profile';
import {Login} from './components/login';
import {Search} from './components/search';
import {Person} from './components/person';
import {Movie} from './components/movie';
import {User} from './components/user';
import {AddMovie} from './components/addMovie';
import React from 'react';
import { Route, Routes } from 'react-router-dom';

export const NavRoutes = () => {
    
    return(
        <>
            <Routes>
                {/* <Route exact path = '/' element={<Profile/>}/> */}
                <Route exact path = '/profile' element={<Profile/>}/>
                <Route exact path = '/login' element={<Login/>}/>
                <Route exact path = '/search' element={<Search/>}/>
                <Route exact path = '/person/:id' element={<Person/>}/>
                <Route exact path = '/movie/:id' element={<Movie/>}/>
                <Route exact path = '/user/:id' element={<User/>}/>
                <Route exact path = '/addMovie' element={<AddMovie/>}/>
            </Routes>
        </>
    )
}