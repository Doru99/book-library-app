import React, { Component } from 'react';
import { 
    BrowserRouter as Router,
    Switch ,
    Route ,
    Link ,
    Redirect
} from 'react-router-dom';
import Axios from 'axios';
import 'bootswatch/dist/flatly/bootstrap.css';
import Menu from './components/menu';
import Register from './components/register';
import Login from './components/login';

class App extends Component {
    render() {
        return (
            <React.Fragment>
                <Menu />
                <Router>
                    <Route exact path='/register' component = {Register} />
                    <Route exact path='/login' component = {Login} />
                </Router>
            </React.Fragment>
        );
    }
}

export default App;