//import { response } from 'express';
import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import Card from './card';

class Dashboard extends Component{
    state = {
        isOpenInsert: false,
        response: [],
        order: 'ascending',
        category: null,
        search: null
    };

    sortBookList = sortKey => {
        var books = this.state.response;
        if (this.state.order === 'ascending') {
            this.setState({order:'descending'});
            books.sort((a, b) => a[sortKey].localeCompare(b[sortKey]));
        } else {
            this.setState({order:'ascending'});
            books.sort((a, b) => b[sortKey].localeCompare(a[sortKey]));
        }
        this.setState({response: books})
        //descending
        //const sorted = books.sort((a, b) => a.title > b.title);
        //console.log(sorted);
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

    onStar = async (bookTitle, bookRating) => {
        await this.setState({ rating: { bookTitle, bookRating}})
        const response = await fetch('http://localhost:5000/dashboard/rateBook', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ put: this.state.rating })
        });
        const body = await response.text();
        this.setState({ responseToPost: body});
    }

    onBookEdit = async(bookTitle, bookNewTitle, bookNewAuthor, bookNewDesc, bookNewCategory) => {
        await this.setState({ edit: { bookTitle, bookNewAuthor, bookNewTitle, bookNewDesc, bookNewCategory}})
        const response = await fetch('http://localhost:5000/dashboard/editBook', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ put: this.state.edit })
        });
        const body = await response.text();
        this.setState({ responseToPost: body});
        console.log(this.state.edit)
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

    filterByCategory = () => {
        if (!this.state.category) {
            return this.state.response;
        }
        return this.state.response.filter(book => book.category === this.state.category)
    };
    
    render() {
        const filterByTitle = (books) => {
            if (!this.state.search) {
                return this.state.response;
            }
            return books.filter(book => book.title.toLowerCase().includes(this.state.search.toLowerCase()));
        }
        const filterByCategory = () => {
            if (!this.state.category) {
                return this.state.response;
            }
            return this.state.response.filter(book => book.category === this.state.category)
        };
        let bookList = filterByTitle(filterByCategory()).map((book,i) =>
        <Card
            key = {i}
            title = {book.title}
            author = {book.author}
            desc = {book.description}
            category = {book.category}
            rating1 = {book.rating1}
            rating2 = {book.rating2}
            onLike = {this.onLike}
            onNeutral = {this.onNeutral}
            onDislike = {this.onDislike}
            onBookDelete = {this.onBookDelete}
            onStar = {this.onStar}
            onEdit = {this.onBookEdit}
        />);
        const categories = new Map([
            ...this.state.response.map(book => [book.category])
        ]);
        let categoryButtons = (
            [...categories].map((category) => 
                <button onClick={() => {
                    if (this.state.category === category[0]) {
                        this.setState({category: null})
                    } else {
                        this.setState({category: category[0]})
                    }
                }} type="button" className="btn btn-secondary mr-1">{category}</button>)
        );
        return (
        <React.Fragment>
            <div className="jumbotron">
                <h1 className="display-4">Dashboard</h1>
                <hr className="my-3"/>
                <p className="lead">
                    <button type="button" className="btn btn-success mr-1" onClick={this.openModal}>Add Book</button>
                    <button type="button" onClick={() => this.sortBookList('title')} className="btn btn-info mr-1">Title<i className="fa fa-sort-alpha-asc mx-1" aria-hidden="true"></i></button>
                    <button type="button" onClick={() => this.sortBookList('author')} className="btn btn-info mr-1">Author<i className="fa fa-sort-alpha-asc mx-1" aria-hidden="true"></i></button>
                    {categoryButtons}
                    <form className="form-inline" style={{display: 'inline-block', float:'right'}}>
                        <input onChange={(e) => {this.setState({search: e.target.value}); console.log(e.target.value);}} className="form-control mr-sm-2" type="text" placeholder="Search"/>
                    </form>
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
                            <label htmlFor="author">Author:</label>
                            <input type="text" className="form-control" onChange={this.onChange} id="author" />
                            <label htmlFor="description">Description:</label>
                            <textarea rows="3" type="text" className="form-control" onChange={this.onChange} id="description" />
                            <label htmlFor="category">Category:</label>
                            <input type="text" className="form-control" onChange={this.onChange} id="category" />
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