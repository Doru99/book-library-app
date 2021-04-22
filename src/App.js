import React, { Component } from 'react';
import { 
    BrowserRouter as Router,
    Switch ,
    Route ,
    Link ,
    Redirect
} from 'react-router-dom';
import 'bootswatch/dist/flatly/bootstrap.css';
import Menu from './components/menu';
import Dashboard from './components/dashboard';

class App extends Component {
    render() {
        return (
            <React.Fragment>
                <Menu />
                <Router>
                    <Switch>
                        <Redirect exact from="/" to="/dashboard" />
                    </Switch>
                    <Route exact path='/dashboard' component = {Dashboard}/>
                </Router>
            </React.Fragment>
        );
    }
}

export default App;