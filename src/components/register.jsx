import React, { Component } from 'react';

class Register extends Component{
    state = {
        name: '',
        surname: '',
        email: '',
        password: '',
        password2: ''
      };

      onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
      };

      handleSubmit = async e => {
        e.preventDefault();
        const response = await fetch('http://localhost:5000/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ post: this.state }),
        });
        const body = await response.text();
        this.setState({ responseToPost: body });
        const newUser = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2
          };
        console.log(newUser);
      };

    render() {
        return(
            <div>
                <div className="card border-primary mb-5 mx-auto mt-5" style={{maxWidth: 50 + 'rem'}}>
                    <div className="card-header">Register</div>
                    <div className="card-body">
                        <form onSubmit={this.handleSubmit}>
                            <fieldset>
                                <label htmlFor="name">Name:</label>
                                <input type="text" onChange={this.onChange} className="form-control mb-3" id="name" placeholder="Enter name..."></input>
                                <label htmlFor="surname">Surname:</label>
                                <input type="text" onChange={this.onChange} className="form-control mb-3" id="surname" placeholder="Enter surname..."></input>
                                <label htmlFor="email">Email:</label>
                                <input type="email" onChange={this.onChange} className="form-control mb-3" id="email" placeholder="Enter email..."></input>
                                <label htmlFor="password">Password:</label>
                                <input type="password" onChange={this.onChange} className="form-control mb-3" id="password" placeholder="Enter password..."></input>
                                <label htmlFor="password2">Confirm Password:</label>
                                <input type="password" onChange={this.onChange} className="form-control mb-3" id="password2" placeholder="Enter password again..."></input>
                            </fieldset>
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </form>
                    </div>
                </div>
                <p className="lead text-center mt-3"><a href="/login">Already registered? Login.</a></p>
            </div>
        )
    }
}

export default Register;