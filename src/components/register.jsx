import React, { Component } from 'react';

class Register extends Component{
    render() {
        return(
            <div>
                <div className="card border-primary mb-5 mx-auto mt-5" style={{maxWidth: 50 + 'rem'}}>
                    <div className="card-header">Register</div>
                    <div className="card-body">
                        <form>
                            <fieldset>
                                <label for="name">Name:</label>
                                <input type="text" className="form-control mb-3" id="name" placeholder="Enter name..."></input>
                                <label for="surname">Surname:</label>
                                <input type="text" className="form-control mb-3" id="surname" placeholder="Enter surname..."></input>
                                <label for="email">Email:</label>
                                <input type="email" className="form-control mb-3" id="email" placeholder="Enter email..."></input>
                                <label for="password">Password:</label>
                                <input type="password" className="form-control mb-3" id="password" placeholder="Enter password..."></input>
                                <label for="password-confirm">Confirm Password:</label>
                                <input type="password" className="form-control mb-3" id="password-confirm" placeholder="Enter password again..."></input>
                            </fieldset>
                            <button type="submit" class="btn btn-primary">Submit</button>
                        </form>
                    </div>
                </div>
                <p className="lead text-center mt-3"><a href="/login">Already registered? Login.</a></p>
            </div>
        )
    }
}

export default Register;