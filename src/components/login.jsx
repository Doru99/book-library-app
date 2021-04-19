import React, { Component } from 'react';

class Login extends Component{
    render() {
        return(
            <div>
                <div className="card border-primary mb-5 mx-auto mt-5" style={{maxWidth: 50 + 'rem'}}>
                    <div className="card-header">Register</div>
                    <div className="card-body">
                        <form>
                            <fieldset>
                                <label for="email">Email:</label>
                                <input type="email" className="form-control mb-3" id="email" placeholder="Enter email..."></input>
                                <label for="password">Password:</label>
                                <input type="password" className="form-control mb-3" id="password" placeholder="Enter password..."></input>
                            </fieldset>
                            <button type="submit" class="btn btn-primary">Submit</button>
                        </form>
                    </div>
                </div>
                <p className="lead text-center mt-3"><a href="/register">No account? Register.</a></p>
            </div>
        )
    }
}

export default Login;