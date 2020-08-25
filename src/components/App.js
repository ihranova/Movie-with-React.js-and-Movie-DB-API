import React from 'react';
import {Router} from '@reach/router';
import Header from './elements/Header';
import Home from './Home';
import NotFound from './NotFound';
import Movie from './Movie';

import {createGlobalStyle} from 'styled-components';

const GlobalStyle = createGlobalStyle`
    body{
        margin:0;
        padding:0;
    }
`;

const App = () => (
    <>
        <Header />
        <Router>
            <Home path = "/" />
            <Movie path = "/:movieId" />
            <NotFound default />
        </Router>
        <GlobalStyle />
    </>
);

export default App;
