import React, { Component } from 'react';

class Login extends Component{
    state = {
        email: '',
        password: ''
    };

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value })
    };

    handleSubmit = async e => {
        e.preventDefault();
        const response = await fetch('http://localhost:5000/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ post: this.state }),
        });
        const body = await response.text();
        this.setState({ responseToPost: body });
        const currUser = {
            email: this.state.email,
            password: this.state.password
          };
        console.log(currUser);
    };

    render() {
        return(
            <div>
                <div className="card border-primary mb-5 mx-auto mt-5" style={{maxWidth: 50 + 'rem'}}>
                    <div className="card-header">Register</div>
                    <div className="card-body">
                        <form onSubmit={this.handleSubmit}>
                            <fieldset>
                                <label for="email">Email:</label>
                                <input type="email" onChange={this.onChange} className="form-control mb-3" id="email" placeholder="Enter email..."></input>
                                <label for="password">Password:</label>
                                <input type="password" onChange={this.onChange} className="form-control mb-3" id="password" placeholder="Enter password..."></input>
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