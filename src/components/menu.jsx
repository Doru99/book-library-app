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
                    <ul className="nav navbar-nav mr-auto">
                        <li className="nav-item active"><a className="nav-link" href="/dashboard">Home</a></li>
                    </ul>
                </div>
            </nav>
        )
    }
}

export default Menu;