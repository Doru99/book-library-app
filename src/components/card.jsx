import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';

function Card(props) {
    const { title, author, desc, category, rating1, rating2, onLike, onNeutral, onDislike, onBookDelete, onStar, onEdit} = props;
    const [isOpen, setIsOpen] = useState(false)
    const [newTitle, setNewTitle] = useState(title)
    const [newDesc, setNewDesc] = useState(desc)
    const [newAuthor, setNewAuthor] = useState(author)
    const [newCategory, setNewCategory] = useState(category)
    
    useEffect(() => {
        setNewTitle(newTitle);
        setNewAuthor(newAuthor);
        setNewDesc(newDesc);
        setNewCategory(newCategory);
    })

    function onTriggerLike(e) {
        onLike({title});
        window.location.reload(false);
    }

    function onTriggerNeutral(e) {
        onNeutral({title});
        window.location.reload(false);
    }

    function onTriggerDislike(e) {
        onDislike({title});
        window.location.reload(false);
    }

    function onTriggerDelete(e) {
        onBookDelete({title});
        window.location.reload(false);
    }

    function onSubmit(e) {
        console.log(newTitle);
        onEdit(title, newTitle, newAuthor, newDesc, newCategory);
    }

    function onTriggerStar(rating) {
        onStar(title,rating);
        window.location.reload(false);
    }
    return(
        <React.Fragment>
            <div className="card text-white bg-primary mx-4 my-1 p-4" style={{maxWidth: '25rem', display:'inline-block', minHeight: '27rem', verticalAlign:'bottom'}}>
                <div className="card-header">
                    <button type="button" onClick={onTriggerDelete} className="btn btn-danger p-1"><i className="fa fa-times" aria-hidden="true"></i></button>
                    <button type="button" onClick={() => setIsOpen(true)} className="btn btn-info p-1 mx-1"><i className="fa fa-pencil-square-o" aria-hidden="true"></i></button>
                    <button type="button" className="btn btn-secondary disabled" disabled>{category}</button>
                </div>
                <div className="card-body">
                    <h4 className="card-title">{title}</h4>
                    <h5 className="card-text">{author}</h5>
                    <p className="card-text">{desc}</p>
                    <div className="btn-group" role="group" aria-label="Basic example">
                        <p className="lead mr-3">
                        <span className="fa fa-star" onClick={() => onTriggerStar('1')} style={{color : (rating2 >= '1') ? 'orange' : ''}}></span>
                        <span className="fa fa-star" onClick={() => onTriggerStar('2')} style={{color : (rating2 >= '2') ? 'orange' : ''}}></span>
                        <span className="fa fa-star" onClick={() => onTriggerStar('3')} style={{color : (rating2 >= '3') ? 'orange' : ''}}></span>
                        <span className="fa fa-star" onClick={() => onTriggerStar('4')} style={{color : (rating2 >= '4') ? 'orange' : ''}}></span>
                        <span className="fa fa-star" onClick={() => onTriggerStar('5')} style={{color : (rating2 === '5') ? 'orange' : ''}}></span>
                        </p>
                        <button type="button" onClick={onTriggerLike} className={"btn btn-success" + ((rating1 === '1') ? "" : " disabled")}><i className="fa fa-thumbs-up"></i></button>
                        <button type="button" onClick={onTriggerNeutral} className={"btn btn-warning" + ((rating1 === '0') ? "" : " disabled")}><i className="fa fa-minus"></i></button>
                        <button type="button" onClick={onTriggerDislike} className={"btn btn-danger" + ((rating1 === '-1') ? "" : " disabled")}><i className="fa fa-thumbs-down"></i></button>
                    </div>
                </div>
            </div>
            <Modal show={isOpen} onHide={() => setIsOpen(false)}>
                <form onSubmit={onSubmit}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            Edit Book
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <fieldset>
                            <label htmlFor="title">Title:</label>
                            <input type="text" className="form-control mb-2" onChange={(e) => setNewTitle(e.target.value)} id="title" value={newTitle}/>
                            <label htmlFor="title">Author:</label>
                            <input type="text" className="form-control mb-2" onChange={(e) => setNewAuthor(e.target.value)} id="author" value={newAuthor}/>
                            <label htmlFor="description">Description:</label>
                            <textarea rows="3" className="form-control mb-2" onChange={(e) => setNewDesc(e.target.value)} id="description" value={newDesc}/>
                            <label htmlFor="category">Category:</label>
                            <input type="text" className="form-control mb-2" onChange={(e) => setNewCategory(e.target.value)} id="category" value={newCategory}/>
                        </fieldset>
                    </Modal.Body>
                    <Modal.Footer>
                    <button type="submit" className="btn btn-primary" onClick={() => setIsOpen(false)}>Save</button>
                    <button type="button" className="btn btn-secondary" onClick={() => setIsOpen(false)}>Close</button>
                    </Modal.Footer>
                </form>
            </Modal>
        </React.Fragment>
    )
}

export default Card;