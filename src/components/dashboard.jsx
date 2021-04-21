import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import Card from './card';

class Dashboard extends Component{
    state = {
        isOpenInsert: false,
        response: [],
      };
    
    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    onBookDelete = async(bookData) => {
        await this.setState({ delete: bookData})
        const response = await fetch('http://localhost:5000/dashboard/deleteBook', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ put: this.state.delete })
        });
        const body = await response.text();
        this.setState({ responseToPost: body});
    };

    onLike = async (bookData) => {
        await this.setState({ like: bookData})
        const response = await fetch('http://localhost:5000/dashboard/likeBook', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ put: this.state.like })
        });
        const body = await response.text();
        this.setState({ responseToPost: body});
    };

    onNeutral = async (bookData) => {
        await this.setState({ neutral: bookData})
        const response = await fetch('http://localhost:5000/dashboard/neutralBook', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ put: this.state.neutral })
        });
        const body = await response.text();
        this.setState({ responseToPost: body});
    }

    onDislike = async (bookData) => {
        await this.setState({ dislike: bookData})
        const response = await fetch('http://localhost:5000/dashboard/dislikeBook', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ put: this.state.dislike })
        });
        const body = await response.text();
        this.setState({ responseToPost: body});
    }

    handleSubmit = async e => {
        const response = await fetch('http://localhost:5000/dashboard/addBook', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ post: this.state }),
        });
        const body = await response.text();
        this.setState({ responseToPost: body });
    };
    
    openModal = () => this.setState({ isOpenInsert: true });
    closeModal = () => this.setState({ isOpenInsert: false });

    componentDidMount() {
        this.callApi()
          .then(res => this.setState({ response: res.express }))
          .catch(err => console.log(err));
    }

    callApi = async () => {
    const response = await fetch('http://localhost:5000/dashboard');
    const body = await response.json();
    return body;
    };
    
    render() {
        console.log(this.state.response);
        let bookList = this.state.response.map((book,i) =>
        <Card
            key = {i}
            title = {book.title}
            desc = {book.description}
            rating1 = {book.rating1}
            rating2 = {book.rating2}
            onLike = {this.onLike}
            onNeutral = {this.onNeutral}
            onDislike = {this.onDislike}
            onBookDelete = {this.onBookDelete}
            onChange = {this.onChange}
        />);
        return (
        <React.Fragment>
            <div className="jumbotron">
                <h1 className="display-4">Dashboard</h1>
                <hr className="my-3"/>
                <p className="lead">
                <button type="button" className="btn btn-success" onClick={this.openModal}>Add Book</button>
                </p>
            </div>
            {bookList}
            <Modal show={this.state.isOpenInsert} onHide={this.closeModal}>
                <form onSubmit={this.handleSubmit}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            Add Book
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <fieldset>
                            <label htmlFor="title">Title:</label>
                            <input type="text" className="form-control" onChange={this.onChange} id="title" />
                            <label htmlFor="description">Description:</label>
                            <input type="text" className="form-control" onChange={this.onChange} id="description" />
                        </fieldset>
                    </Modal.Body>
                    <Modal.Footer>
                    <button type="submit" className="btn btn-primary" onClick={this.closeModal}>Save</button>
                    <button type="button" className="btn btn-secondary" onClick={this.closeModal}>Close</button>
                    </Modal.Footer>
                </form>
            </Modal>
        </React.Fragment>
        )
    }
}

export default Dashboard;