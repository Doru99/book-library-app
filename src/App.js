import React, { Component } from 'react';
import { 
    BrowserRouter as Router,
    Switch ,
    Route ,
    Link ,
    Redirect
} from 'react-router-dom';
import 'bootswatch/dist/flatly/bootstrap.css'
import Menu from './components/menu'
import Register from './components/register'
import Login from './components/login'

class App extends Component {
    render() {
        return (
            <React.Fragment>
                <Menu />
                <Router>
                    <Route exact path='/register' component = {Register} />
                    <Route exact path='/login' component = {Login} />
                    <Route path="*" render={()=>{<h1>404</h1>}} />
                </Router>
            </React.Fragment>
        );
    }
}

export default App;