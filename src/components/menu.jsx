import React, { Component } from 'react';

class Menu extends Component {
    render() {
        return (
            <nav className="navbar navbar-dark bg-primary">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <a className="navbar-brand" href="#">
                            Book Library
                        </a>
                    </div>
                    <ul className="nav navbar-nav">
                        <li className="nav-item active"><a className="nav-link" href="#">Home</a></li>
                    </ul>
                    <ul className="nav navbar-nav navbar-right">
                        <li className="nav-item"><a className="nav-link" href="#">Sign Up</a></li>
                        <li className="nav-item"><a className="nav-link" href="#">Login</a></li>
                    </ul>
                </div>
            </nav>
        )
    }
}

export default Menu;