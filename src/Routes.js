import React from 'react';
import {
    BrowserRouter,
    Route,
    Switch
} from 'react-router-dom';

// Components
import Home from './containers/Home';
import About from './containers/About';
import Login from './containers/Login';
import SignupRoutes from './routes/SignupRoutes';

const Routes = () => (
    <BrowserRouter>
        <div id='app'>
            <Switch>
                <Route exact={true} path='/' component={Home} />
                <Route path='/about' component={About} />
                <Route path='/login' component={Login} />
                <Route path='/signup' component={SignupRoutes} />
            </Switch>
        </div>
    </BrowserRouter>
);

export default Routes;