import {Profile} from './components/profile';
import React from 'react';
import { Route, Routes } from 'react-router-dom';

export const NavRoutes = () => {
    return(
        <>
            <Routes>
                <Route exact path = '/profile' element={<Profile/>}/>
            </Routes>
        </>
    )
}